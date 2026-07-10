import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APEX.CORE — Liquid Interface",
  description: "WebGL Mercury Surface + Hyper Folding Transition",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
