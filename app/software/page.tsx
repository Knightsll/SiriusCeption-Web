"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: {
    back: "Home",
    badge: "Software",
    title: "Validation software for the data acquisition platform",
    lead:
      "SiriusCeption software is an operator tool for device validation, signal checking, calibration, and motion-mapping debugging. It supports the hardware data-acquisition platform; it is not the final product structure by itself.",
    cards: [
      {
        title: "Device setup & signal quality",
        body: "Guide users from hardware connection to reliable receiver status before production capture starts.",
        points: ["Node identity", "Receiver readiness", "Online / stale status"]
      },
      {
        title: "Role mapping for capture",
        body: "For robotic-arm data capture, users explicitly map different Sirius Nova device IDs to required body or control roles.",
        points: ["Role IDs", "Duplicate-ID protection", "Capture readiness"]
      },
      {
        title: "Calibration & validation",
        body: "The UI helps users verify calibration quality and motion mapping before collecting embodied-intelligence data.",
        points: ["Guided calibration", "Motion quality check", "Recoverable errors"]
      },
      {
        title: "Robot-model inspection",
        body: "Robot and URDF views are validation aids for understanding mapping, limits, and expected data shape before real deployment.",
        points: ["URDF model inspection", "Joint-limit feedback", "Dataset readiness"]
      }
    ]
  },
  zh: {
    back: "首页",
    badge: "软件",
    title: "面向数据采集平台的验证软件",
    lead:
      "SiriusCeption 软件是给用户做设备验证、信号检查、标定和动作映射调试的操作工具。它服务于硬件数据采集平台，本身不是产品的最终结构。",
    cards: [
      {
        title: "设备接入与信号质量",
        body: "在正式采集前，引导用户完成硬件连接并确认接收端状态稳定。",
        points: ["节点身份", "接收端就绪", "在线 / stale 状态"]
      },
      {
        title: "采集角色映射",
        body: "针对机械臂数据采集，用户把不同 Sirius Nova 设备 ID 明确映射到需要的身体或控制角色。",
        points: ["角色 ID", "重复 ID 防护", "采集就绪"]
      },
      {
        title: "标定与验证",
        body: "UI 帮助用户在采集具身智能数据前验证标定质量和动作映射效果。",
        points: ["引导式标定", "动作质量检查", "异常可恢复"]
      },
      {
        title: "机器人模型检查",
        body: "机器人和 URDF 视图是理解映射、限位和预期数据形态的验证工具，用于正式部署前检查。",
        points: ["URDF 模型检查", "关节限位反馈", "数据集就绪"]
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
