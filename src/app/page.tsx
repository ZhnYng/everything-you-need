import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowRight, Fish, LogIn, Upload } from "lucide-react";
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
    <div className="w-screen bg-gradient-to-r">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">All your personal information in one place.</h1>
          </div>

          <div className="flex my-4 gap-4">
            {isAuth && (
              <>
                <Link href={firstChat ? `/chat/${firstChat.id}` : '/chat/1'}>
                  <Button>
                    Start chatting <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link href='/upload-documents'>
                  <Button>
                    Upload documents <Upload className="ml-2" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Retrieve information from your large database of documents by asking. Powered by LLMs and vector database retrieval.
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <></>
            ) : (
              <Link href="/sign-in">
                <Button>
                  Get started
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