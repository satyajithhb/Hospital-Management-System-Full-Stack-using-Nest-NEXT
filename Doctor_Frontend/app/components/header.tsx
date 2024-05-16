"use client";
import Link from "next/link";
import { CiStethoscope } from "react-icons/ci";

const Header = () => {
  return (<>
    <nav className="bg-custombg text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
          <div className="flex items-center">
            <CiStethoscope size={30} className="text-signup-bg mx-5" />
            <Link href="/">
              <span className="text-xl font-bold cursor-pointer">
                Doctor Portal
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-10 ml-10 ">
              <Link href="/">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Appointments
                </span>
              </Link>
              <Link href="/">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Emergency
                </span>
              </Link>
              <Link href="/">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Feedback
                </span>
              </Link>
              <Link href="/signup">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Signup
                </span>
              </Link>
              <Link href="/signin">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Signin
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Header;
