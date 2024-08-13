import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/Pretendard-Medium.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Bold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--pretendard",
});
