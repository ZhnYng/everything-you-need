"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import { Message } from "ai";
import Image from "next/image";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await fetch("/api/get-messages", {
        method: "POST",
        body: JSON.stringify({ chatId })
      })

      return await response.json() as Message[];
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="relative min-h-screen overflow-y-scroll p-4 flex flex-col items-center"
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 p-2 flex w-full items-center h-14">
        <div className="w-10 h-10">
          <Image src={"/logo_govtech_hort.gif"} alt="GovTech Logo" layout={'fill'} objectFit={'contain'} />
        </div>
        <h3 className="text-xl font-bold">Everything You Need</h3>
      </div>

      {/* message list */}
      <MessageList messages={messages} isLoading={isLoading} />

      <form
        onSubmit={handleSubmit}
        className="absolute bottom-0 inset-x-0 px-2 py-4 bg-white"
      >
        <div className="flex justify-center">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full max-w-3xl h-12"
          />
          <Button className="ml-2 h-12 w-16 hover:bg-purple-600 hover:text-white" variant={"outline"}>
            <Send className="h-6 w-6" />
          </Button>
        </div>
        <p className="text-center text-gray-400 my-3">Everything You Need contains context from the Singapore Government but may be manipulated into using context from elsewhere.</p>
      </form>
    </div>
  );
};

export default ChatComponent;