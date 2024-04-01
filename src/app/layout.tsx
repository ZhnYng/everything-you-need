import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Everything You Need",
  description: "All your government resources in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang='en'>
          <body>
            <Toaster position="top-right" />
            {children}
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
