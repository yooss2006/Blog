import type { Metadata } from "next";

import "./globals.css";
import { ReactQueryProvider } from "@/components/providers/app-provider";

import Header from "../components/layout/header/header";
import SideBar from "../components/layout/side-bar/side-bar";

import { pretendard } from "./fonts";

export const metadata: Metadata = {
  title: "긱 갱스터 블로그",
  description: "긱 갱스터 블로그",
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
