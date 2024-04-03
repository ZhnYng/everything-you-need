import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileKey = searchParams.get("fileKey");

    if (!fileKey) {
      return NextResponse.json(
        { error: "File key is missing" },
        { status: 400 }
      );
    }

    const storage = new Storage();
    const fileDestination = `/tmp/pdf-${Date.now()}.pdf`;

    const options = {
      destination: fileDestination,
    };

    // Downloads the file
    await storage.bucket("every-document").file(fileKey).download(options);

    return NextResponse.json(
      { file_destination: fileDestination },
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
