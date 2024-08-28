import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";



const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full bg-background backdrop-blur-lg transition-all ">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between ">
          <Link href="/" className="flex z-40 font-semibold">
            <span>FileVoice</span>
          </Link>
          {/* mobile navbar */}
          <div className="hidden items-center space-x-4 sm:flex">
            <div>
                <Link href='/pricing'
                className={buttonVariants({
                    variant:'ghost',
                    size:'sm',
                })}
                >
                    Pricing
                </Link>
                <LoginLink className={buttonVariants({
                    variant:'ghost',
                    size:'sm',
                })} >
                    Sign In
                </LoginLink>
                <RegisterLink className={buttonVariants({
                    size:'sm',
                })}>
                    Get Started

                </RegisterLink>
            </div>

          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
