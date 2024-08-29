import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

export const getPineconeClient = async () => {
  const client:any = new PineconeClient()

  await client.init({
    apiKey: process.env.PINECONE_API_KEY!,
  })

  return client
}