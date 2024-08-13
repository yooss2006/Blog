import type { Metadata } from "next";

import "./globals.css";
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
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
