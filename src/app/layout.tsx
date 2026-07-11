import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// 使用 JetBrains Mono 增加代码终端的硬核感
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ROOT_CHECK // ENGINE",
  description: "Advanced Android Environment Analysis & Root Detection System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.className} bg-[#0a0a0c] text-emerald-500 antialiased overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-400`}
      >
        {children}
      </body>
    </html>
  );
}
