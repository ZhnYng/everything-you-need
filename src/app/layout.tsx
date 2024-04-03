import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";

const lato = Lato({ subsets: ["latin"], weight: ["100", "400", "700", "900"] });

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
        <html lang='en' className={lato.className}>
          <body>
            <Toaster position="top-right" />
            {children}
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
