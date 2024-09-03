import type { Metadata } from "next";

import "./globals.css";
import Header from "../components/layout/header/header";
import { pretendard } from "./fonts";
import SideBar from "../components/layout/side-bar/side-bar";
import { ReactQueryProvider } from "@/components/providers/app-provider";

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
            <div className="flex-1 text-normalColor">
              <Header />
              {children}
            </div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
