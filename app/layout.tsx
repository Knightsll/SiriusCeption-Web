import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiriusCeption | 具身智能数据采集系统",
  description: "SiriusCeption 以可穿戴 IMU 硬件为起点，面向采集、遥操作、质检、标注、回放与机器人数据导出的具身智能一站式数据采集系统。"
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
