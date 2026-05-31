"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "zh";

const copy = {
  en: { back: "Home", badge: 'Product', title: 'Product Architecture', lead: 'A focused view of the SiriusCeption wearable motion-capture system, from arm-only deployment to full-body data collection.', cards: [
      { title: 'Full-body version', body: 'For torso, limb, and full workflow motion capture.', points: ['17+ joint capture', 'Human-to-robot mapping', 'Motion library creation'] },
      { title: 'Arm-only version', body: 'A lighter package for fast teleoperation and upper-limb data.', points: ['Lower cost deployment', 'Fast calibration', 'Works with vision and force feedback'] },
      { title: 'Extensible stack', body: 'Designed for sensor fusion and future data workflows.', points: ['Open data interface', 'Multi-device collaboration', 'Replay and labeling pipeline'] }
    ] },
  zh: { back: "首页", badge: '产品', title: '产品架构', lead: '集中介绍 SiriusCeption 可穿戴动作捕捉系统，从手臂版本到全身数据采集。', cards: [
      { title: '全身版本', body: '覆盖躯干、四肢与完整动作流程采集。', points: ['17+ 关节捕捉', '人到机器人映射', '动作库沉淀'] },
      { title: '手臂版本', body: '面向快速遥操作和上肢数据采集的轻量方案。', points: ['低成本部署', '快速标定', '可结合视觉与力反馈'] },
      { title: '可扩展栈', body: '面向传感器融合和后续数据流程设计。', points: ['开放数据接口', '多设备协同', '回放与标注管线'] }
    ] }
} as const;

export default function SplitPage() {
  const [locale, setLocale] = useState<Locale>("zh");
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
