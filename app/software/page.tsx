"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: { back: "Home", badge: 'Software', title: 'Software Platform', lead: 'A high-level companion software layer. Public content stays product-facing; concrete operator screens remain part of private deployment.', cards: [
      { title: 'Device onboarding', body: 'Guided setup and receiver readiness for wearable nodes.', points: ['Deployment-oriented', 'Hardware-aware', 'Operator-friendly'] },
      { title: 'Motion validation', body: 'Visual checks for motion quality before downstream use.', points: ['Pose preview', 'Signal quality checks', 'Calibration support'] },
      { title: 'Robot integration', body: 'Safe mapping and preview once target hardware is confirmed.', points: ['Model-specific mapping', 'Preview before output', 'Safety-gated workflow'] }
    ] },
  zh: { back: "首页", badge: '软件', title: '软件平台', lead: '高层次的配套软件介绍。官网只展示产品定位，具体操作页面属于私有交付内容。', cards: [
      { title: '设备接入', body: '为可穿戴节点和接收端状态提供引导。', points: ['面向交付', '理解硬件', '便于操作者使用'] },
      { title: '动作验证', body: '在进入下游流程前检查动作质量。', points: ['姿态预览', '信号质量检查', '标定支持'] },
      { title: '机器人集成', body: '目标硬件确认后进行安全映射与预览。', points: ['模型专用映射', '输出前预览', '安全门控流程'] }
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
