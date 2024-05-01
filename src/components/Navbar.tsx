import { UserButton, auth } from "@clerk/nextjs";
import { FileStack, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { userId } = auth();
  const isAuth = !!userId;

  return (
    <nav className="bg-white absolute z-50 w-screen text-lg p-6 flex items-center justify-between">
      <Link href="/">
        <h1 className="text-xl font-bold flex gap-2 items-center">
          <FileStack/>
          Everything You Need
        </h1>
      </Link>
      {isAuth ?
        <div className="flex items-center gap-3">
          <h3>Account</h3>
          <UserButton afterSignOutUrl="/" />
        </div>
        :
        <div>
          <Link href="/sign-in" className="flex items-center gap-2">
            <h3>Login</h3>
            <LogIn/>
          </Link>
        </div>
      }
    </nav>
  )
}