import { db } from "@/db";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export const POST=async(req:NextRequest)=>{
    const body=await req.json()
    const session = await getKindeServerSession();
    const user = await session.getUser();
    const userId = user?.id as string | undefined;
    if(!userId){
       return new Response("UNAUTHORIED",{status:401})
    }
    const {fileId,message}=SendMessageValidator.parse(body)
    const file = await db.file.findFirst({
        where: {
          id: fileId,
          userId,
        },
      })
    
      if (!file)
        return new Response('Not found', { status: 404 })
    
      await db.message.create({
        data: {
          text: message,
          isUserMessage: true,
          userId,
          fileId,
        },
      })
      //
}