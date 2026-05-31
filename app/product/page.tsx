"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: { back: "Home", badge: 'Product', title: 'Embodied Data Acquisition Architecture', lead: 'SiriusCeption is hardware-first today: wearable IMU devices are the current product layer, and the roadmap is a one-stop embodied-intelligence data acquisition system.', cards: [
      { title: 'Current hardware layer', body: 'Wearable IMU nodes provide the reliable sensing foundation for human demonstration capture.', points: ['Arm-first deployment', 'Full-body expansion path', 'High-frequency motion data'] },
      { title: 'Three-device teleop layer', body: 'Arm teleoperation is designed around three clearly assigned devices: upper arm, forearm, and hand.', points: ['Role-based binding', 'All-three-online gate', 'Calibration before output'] },
      { title: 'Future data system', body: 'The platform direction is to unify capture sessions, data QA, labels, replay, and export.', points: ['Session management', 'Dataset validation', 'Robot-ready data export'] }
    ] },
  zh: { back: "首页", badge: '产品', title: '具身智能数据采集架构', lead: 'SiriusCeption 现阶段是硬件优先：可穿戴 IMU 设备是当前产品层，长期目标是一站式具身智能数据采集系统。', cards: [
      { title: '当前硬件层', body: '可穿戴 IMU 节点为人体示教采集提供稳定的感知基础。', points: ['从手臂部署开始', '可扩展到全身采集', '高频动作数据'] },
      { title: '三设备遥操作层', body: '手臂遥操作围绕三个明确角色的设备设计：上臂、前臂、手部。', points: ['按角色绑定', '三设备在线门控', '输出前先标定'] },
      { title: '未来数据系统', body: '平台方向是统一采集会话、数据质检、标签、回放和导出。', points: ['会话管理', '数据集验证', '机器人可用数据导出'] }
    ] }
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
