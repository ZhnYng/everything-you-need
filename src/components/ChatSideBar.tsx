"use client";

import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  const [title, setTitle] = React.useState('No title')

  return (
    <div className="w-full min-h-screen overflow-y-scroll p-4 text-black">
      <Link href="/">
        <Button className="w-full border-dashed border-black border" variant={"outline"}>
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex h-full pb-20 flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-gray-200 text-gray-900": chat.id === chatId,
                "bg-white hover:bg-gray-200 text-gray-900": chat.id !== chatId,
              })}
            >
              {/* <Input 
                value={title}
                className=""
              /> */}
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                No Title
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;