import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

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

      // Log the file key instead of URL
      console.log('File uploaded, key is:', createdFile.key);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
