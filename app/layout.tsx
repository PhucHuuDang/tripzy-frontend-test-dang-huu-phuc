import type { Metadata } from "next";
import { Nunito_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { SelectLanguage } from "@/components/content/select-language";
import Link from "next/link";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    absolute: "Tripzy",
    template: "%s | Tripzy",
  },
  description: "Tripzy is a platform for booking flights, hotels, and buses.",

  icons: {
    icon: "/logo.png",
  },

  openGraph: {
    images: [
      {
        url: "/logo.png",
      },
    ],
  },

  authors: [
    {
      name: "Dang Huu Phuc",
      url: "https://github.com/PhucHuuDang",
    },
  ],

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunitoSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-linear-[180deg,#F5F8FF_-7.14%,#DBF5FF_100%] absolute top-0 left-0 w-full h-[495px] z-[-1]"></div>

        <header className="w-full px-6 py-6  mx-auto container max-w-[1300px] md:w-full flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 w-[100px] h-[100px]"
          >
            <Image
              src="/logo.png"
              alt="Tripzy Logo"
              width={100}
              height={100}
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
          <SelectLanguage />
        </header>

        {children}
      </body>
    </html>
  );
}
