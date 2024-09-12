import type { Metadata } from "next";

import "./globals.css";
import { ReactQueryProvider } from "@/components/providers/app-provider";

import Header from "../components/layout/header/header";
import SideBar from "../components/layout/side-bar/side-bar";

import { pretendard } from "./fonts";

export const metadata: Metadata = {
  title: "긱 갱스터 블로그",
  description: "긱 갱스터 블로그",
  verification: {
    google: "yRNuE0zjFXY4ZM0HpF_T0M_XPlh_DrbW1p6MBj6ztuc",
    other: {
      "naver-site-verification": "0affda2571a89535996089b36c824cec1b8bafe7",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <ReactQueryProvider>
          <div className="w-full h-full flex">
            <SideBar />
            <div className="flex-1 text-normalColor overflow-hidden">
              <Header />
              {children}
            </div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
