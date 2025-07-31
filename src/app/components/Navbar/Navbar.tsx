"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        MyApp
      </Link>
      <div className="space-x-6">
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>
        {/* <Link href="/about" className="hover:text-blue-500">
          About
        </Link> */}
        <Link href="/tournaments" className="hover:text-blue-500">
          Tournaments
        </Link>
        <Link href="/auth/login" className="hover:text-blue-500">
          Login
        </Link>
      </div>
    </nav>
  );
}
