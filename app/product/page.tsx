"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: { back: "Home", badge: 'Product system', title: 'SiriusCeption product architecture', lead: 'Sirius Nova is the first product in the SiriusCeption system. The product architecture begins with wearable IMU hardware today, then expands toward a one-stop embodied-intelligence data acquisition workflow.', cards: [
      { title: 'Sirius Nova · first product', body: 'The dedicated product page focuses on the wearable IMU node, its 3D hardware preview, and the three-device arm workflow.', points: ['Open /products/sirius-nova', 'Wearable IMU node', '3D product inspection'] },
      { title: 'Three-device teleop layer', body: 'Arm teleoperation is designed around three clearly assigned devices: upper arm, forearm, and hand.', points: ['Role-based binding', 'All-three-online gate', 'Simulator preview after calibration'] },
      { title: 'Future data system', body: 'The platform direction is to unify capture sessions, data QA, labels, replay, and export.', points: ['Session management', 'Dataset validation', 'Robot/simulator data export'] }
    ] },
  zh: { back: "首页", badge: '产品系统', title: 'SiriusCeption 产品架构', lead: 'Sirius Nova 是 SiriusCeption 系统中的第一个产品。产品架构从当前可穿戴 IMU 硬件开始，逐步扩展为一站式具身智能数据采集流程。', cards: [
      { title: 'Sirius Nova · 首款产品', body: '独立产品页会聚焦可穿戴 IMU 节点、3D 硬件预览和三设备手臂工作流。', points: ['打开 /products/sirius-nova', '可穿戴 IMU 节点', '3D 产品查看'] },
      { title: '三设备遥操作层', body: '手臂遥操作围绕三个明确角色的设备设计：上臂、前臂、手部。', points: ['按角色绑定', '三设备在线门控', '标定后进入模拟预览'] },
      { title: '未来数据系统', body: '平台方向是统一采集会话、数据质检、标签、回放和导出。', points: ['会话管理', '数据集验证', '机器人/仿真数据导出'] }
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
              {index === 0 ? <a className="software-doc-link cta ghost" href="/products/sirius-nova">Sirius Nova</a> : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
