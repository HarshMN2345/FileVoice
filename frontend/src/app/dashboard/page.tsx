import Dashboard from '@/components/Dashboard';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
    // Await the session to ensure the data is fetched
    const session = await getKindeServerSession();
    const user = await session.getUser();

    // Redirect if the user is not authenticated
    if (!user) {
        redirect('/auth-callback?origin=dashboard');
        return null; // Ensure nothing is rendered after redirect
    }
    const dbUser=await db.user.findFirst({
        where:{
            id:user.id
        }
    })
    if(!dbUser){
        redirect("/auth-callback?origin=dashboard")
    }

    // Render the user information if available
    return (
        <>
            <Dashboard/>
        </>
    );
};

export default Page;
