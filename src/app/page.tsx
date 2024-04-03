import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowRight, Fish, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  let firstChat;

  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r">
      <nav className="w-screen text-lg p-6 flex items-center justify-between border-b-2 border-purple-100 border">
        <div className="flex items-center gap-6">
          <Image
            src="/logo_govtech_hort.gif"
            width={250}
            height={50}
            alt="Picture of the author"
          />
          <h1 className="text-2xl font-bold">Everything You Need</h1>
        </div>
        {isAuth ?
          <div className="flex items-center gap-3">
            <h3>Account</h3>
            <UserButton afterSignOutUrl="/" />
          </div>
          :
          <></>
        }
      </nav>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Every government service in one place.</h1>
          </div>

          <div className="flex my-4">
            {isAuth && (
              <>
                <Link href={firstChat ? `/chat/${firstChat.id}` : '/chat/1'}>
                  <Button>
                    Start chatting <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Tell us what you need and we will find it for you. Every information for all government services in one place.
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <></>
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}