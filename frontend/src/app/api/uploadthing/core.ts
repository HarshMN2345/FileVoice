import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { getPineconeClient } from "@/lib/pinecone";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await getKindeServerSession();
      const user = await session.getUser();
      if (!user) {
        throw new UploadThingError('UNAUTHORIZED');
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Save the uploaded file's metadata including only the key
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://utfs.io/f/${file.key}`, // Constructed URL,
          uploadStatus: 'SUCCESS'
        },
      });
      try {
        const response = await fetch(
          `https://utfs.io/f/${file.key}`
        )
        const blob=await response.blob()
        const loader=new PDFLoader(blob);
        const pageLevelDocs = await loader.load()

        const pagesAmt = pageLevelDocs.length
        // vectorize and index entire document
        const pinecone = await getPineconeClient();
        const pineconeIndex = pinecone.Index('filevoice');
        const embeddings = new GoogleGenerativeAIEmbeddings({
          model: "text-embedding-004", // 768 dimensions
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        });
     

        await PineconeStore.fromDocuments(
          pageLevelDocs,
          embeddings,
          {
            pineconeIndex,
            namespace: createdFile.id,
          }
        )

        await db.file.update({
          data: {
            uploadStatus: 'SUCCESS',
          },
          where: {
            id: createdFile.id,
          },
        })
      }catch(err){
        await db.file.update({
          data: {
            uploadStatus: 'FAILED',
          },
          where: {
            id: createdFile.id,
          },
        })
      }
      // Log the file key instead of URL
      console.log('File uploaded, key is:', createdFile.key);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
