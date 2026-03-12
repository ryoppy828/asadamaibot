import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ぴんぽんわんこ | 卓球AIアシスタント",
  description:
    "@tabletennis_mai 公式AIアシスタント「ぴんぽんわんこ」が、卓球の技術相談・用具診断・MYTEMグッズ診断にお答えします！",
  keywords: ["卓球", "AI", "相談", "ぴんぽんわんこ", "tabletennis_mai", "MYTEM"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {/* メッシュグラデーション装飾 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div className="float-circle-1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-teal/[0.04] blur-[80px]" />
          <div className="float-circle-2 absolute top-[20%] -right-24 w-[400px] h-[400px] rounded-full bg-teal/[0.03] blur-[70px]" />
          <div className="float-circle-1 absolute bottom-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-teal/[0.035] blur-[60px]" />
          <div className="float-circle-2 absolute top-[60%] right-[30%] w-[200px] h-[200px] rounded-full bg-fuchsia/[0.015] blur-[50px]" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
