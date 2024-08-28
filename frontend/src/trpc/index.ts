import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const session = await getKindeServerSession();
    const user = await session.getUser();

    if (user) {
      if (!user.id || !user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }else{
        const dbUser=await db.user.findFirst({
            where:{
                id:user.id
            }
        })
        if(!dbUser){
            await db.user.create({
                data:{
                    id:user.id,
                    email:user.email
                }
            })
        }
        return {success:true}
      }
    } else {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  }),
});
export type AppRouter = typeof appRouter;
