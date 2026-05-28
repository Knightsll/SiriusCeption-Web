import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiriusCeption | 具身智能数据与遥操作平台",
  description: "SiriusCeption 全身姿态跟踪可穿戴设备，用于具身智能数据采集与机器人遥操作。"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
