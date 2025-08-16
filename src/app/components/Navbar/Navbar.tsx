"use client";

import Link from "next/link";
import { useAppSelector } from "../../../store/hook";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <Link href="/" className="text-xl font-bold text-blue-600">
        MyApp
      </Link>
      <div className="space-x-6 flex border items-center">
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>
        {/* <Link href="/about" className="hover:text-blue-500">
          About
        </Link> */}
        <Link href="/tournaments" className="hover:text-blue-500">
          Tournaments
        </Link>

        {user ? (
          <div className="w-[36px] h-[36px] rounded-full border"></div>
        ) : (
          <Link href="/auth/login" className="hover:text-blue-500">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}
