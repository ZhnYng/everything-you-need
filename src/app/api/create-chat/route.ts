import { getDocumentUrl } from "@/lib/cloudStorage";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadDocumentIntoPinecone } from "@/lib/pinecone";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    await loadDocumentIntoPinecone(file_key);

    const url = await getDocumentUrl(file_key);
    if(!url) {
      return NextResponse.json(
        { error: "Invalid file key" },
        { status: 400 }
      );
    }
    
    const chatId = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: url,
        userId,
      })
      .returning({
        insertedId: chats.id,
      });

    return NextResponse.json(
      { chat_id: chatId[0].insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
