import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import MobileNav from "./MobileNav";
import { ArrowRight } from "lucide-react";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";




const Navbar = async() => {
  const session = await getKindeServerSession();
    const user = await session.getUser();
    
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full bg-background backdrop-blur-lg transition-all ">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between ">
          <Link href="/" className="flex z-40 font-semibold">
            <span>FileVoice</span>
          </Link>
          {/* mobile navbar */}
          <MobileNav isAuth={!!user} />
          <div className="hidden items-center space-x-4 sm:flex">
          {!user ? (
              <>
                <Link
                  href='/pricing'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Pricing
                </Link>
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Get started{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Dashboard
                </Link>
                {/* //stripe integration if want */}
                <LogoutLink
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Logout
                </LogoutLink>

              </>
            )}

          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
