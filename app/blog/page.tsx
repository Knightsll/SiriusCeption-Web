"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: { back: "Home", badge: 'Blog', title: 'Blog / Research Updates', lead: 'A separate home for technical notes, project updates, and collaboration stories so the landing page stays lightweight.', cards: [
      { title: 'Embodied motion library', body: 'How structured capture workflows improve training data value.', points: ['Motion decomposition', 'Label design', 'Dataset reuse'] },
      { title: 'Teleoperation latency', body: 'End-to-end optimization from sensing to control output.', points: ['Sensor fusion', 'Transport timing', 'Control preview'] },
      { title: 'Wearable tracker maintenance', body: 'Reliability and calibration practices for high-frequency use.', points: ['Calibration routine', 'Mounting checks', 'Field maintenance'] }
    ] },
  zh: { back: "首页", badge: 'Blog', title: 'Blog / 研究与进展', lead: '技术文章、项目动态和合作案例放在独立页面，让首页保持轻量。', cards: [
      { title: '具身动作库', body: '结构化采集流程如何提升训练数据价值。', points: ['动作拆解', '标签设计', '数据集复用'] },
      { title: '遥操作延迟', body: '从感知到控制输出的端到端优化。', points: ['传感融合', '传输时序', '控制预览'] },
      { title: '可穿戴设备维护', body: '高频使用下的可靠性与标定实践。', points: ['标定流程', '佩戴检查', '现场维护'] }
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
