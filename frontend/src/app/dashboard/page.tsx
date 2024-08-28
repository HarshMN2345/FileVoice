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

    // Render the user information if available
    return (
        <>
            <h1>Hi user! Your email is: {user.email}</h1>
        </>
    );
};

export default Page;
