"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: {
    back: "Home",
    badge: "Software",
    title: "Beginner-friendly Simulator Software",
    lead:
      "SiriusCeption software helps new users test devices, understand the three-IMU teleop workflow, and preview robot motion in a safe simulator. It is not designed to operate a physical robot from the public UI.",
    cards: [
      {
        title: "Device setup & status",
        body: "Guide users from hardware connection to a reliable receiver state before any teleop workflow starts.",
        points: ["Node identity", "Receiver readiness", "Online / stale status"]
      },
      {
        title: "Three-device role binding",
        body: "Before control starts, users explicitly map different SiriusCeption device IDs to upper arm, forearm, and hand.",
        points: ["Upper arm ID", "Forearm ID", "Hand ID", "Duplicate-ID protection"]
      },
      {
        title: "Calibration & safe preview",
        body: "The UI walks beginners through calibration and keeps algorithm details inside the protected backend layer.",
        points: ["Guided calibration", "Backend-only teleop logic", "Graceful error recovery"]
      },
      {
        title: "Real URDF simulator",
        body: "Robot Control is a simulator learning view: users see robot motion and gripper preview without sending commands to real hardware.",
        points: ["URDF model preview", "Joint-limit feedback", "Simulator-only operation"]
      }
    ]
  },
  zh: {
    back: "首页",
    badge: "软件",
    title: "面向新手的 Simulator 软件",
    lead:
      "SiriusCeption 软件用于帮助新手测试设备、理解三 IMU 遥操作流程，并在安全的 simulator 中预览机器人动作。公开 UI 不用于真实控制机械臂。",
    cards: [
      {
        title: "设备接入与状态",
        body: "先引导用户完成硬件连接与接收端状态确认，再进入任何遥操作流程。",
        points: ["节点身份", "接收端就绪", "在线 / stale 状态"]
      },
      {
        title: "三设备角色绑定",
        body: "启动控制前，用户必须把不同的 SiriusCeption 设备 ID 明确绑定到上臂、前臂和手部。",
        points: ["上臂 ID", "前臂 ID", "手部 ID", "重复 ID 防护"]
      },
      {
        title: "标定与安全预览",
        body: "UI 引导新手完成标定，同时把末端计算与 gripper 等核心逻辑保留在受保护的后端层。",
        points: ["引导式标定", "后端封装遥操作逻辑", "异常不中断全局"]
      },
      {
        title: "Real URDF Simulator",
        body: "Robot Control 是 simulator 学习视图：用户可以看到机器人动作和 gripper preview，但不会向真实硬件发送控制命令。",
        points: ["URDF 模型预览", "关节限位反馈", "仅 simulator 操作"]
      }
    ]
  }
} as const;

export default function SplitPage() {
  const [locale, setLocale] = useLocale();
  const t = useMemo(() => copy[locale], [locale]);
  return (
    <main className="page split-page" data-locale={locale}>
      <div className="bg-ambient" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <header className="nav">
        <a className="brand" href="/">
          <span className="brand-mark">SC</span>
          <span className="brand-name">SiriusCeption</span>
        </a>
        <nav className="nav-links">
          <a href="/product">{locale === "en" ? "Product" : "产品"}</a>
          <a href="/applications">{locale === "en" ? "Applications" : "应用"}</a>
          <a href="/software">{locale === "en" ? "Software" : "软件"}</a>
          <a href="/videos">{locale === "en" ? "Videos" : "视频"}</a>
          <a href="/blog">Blog</a>
        </nav>
        <div className="nav-actions">
          <div className="lang-select">
            <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label="Language">
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <a className="cta ghost" href="/">{t.back}</a>
        </div>
      </header>

      <section className="split-hero reveal">
        <span className="tag">{t.badge}</span>
        <h1>{t.title}</h1>
        <p>{t.lead}</p>
      </section>

      <section className="section split-content">
        <div className="cards reveal">
          {t.cards.map((card, index) => (
            <article className={`card ${index === 0 ? "highlight" : ""}`} key={card.title}>
              <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <ul>
                {card.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
