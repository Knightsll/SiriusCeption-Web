"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: { back: "Home", badge: 'Applications', title: 'Applications', lead: 'How SiriusCeption grows from wearable hardware into an embodied-intelligence data acquisition system for robot learning.', cards: [
      { title: 'Embodied data acquisition', body: 'The primary value is collecting realistic, reusable human demonstration data for robot learning.', points: ['Workflow-level demonstrations', 'Micro-action detail', 'Dataset reuse'] },
      { title: 'Robot teleoperation', body: 'Use three-device arm capture to map human intent into robot operation and data generation.', points: ['Upper arm · forearm · hand', 'Low-latency control', 'Preview before output'] },
      { title: 'Immersive interaction', body: 'Use wearable motion as a natural interface.', points: ['Wear-and-go setup', 'Realtime feedback', 'Training and simulation'] }
    ] },
  zh: { back: "首页", badge: '应用', title: '应用场景', lead: 'SiriusCeption 如何从可穿戴硬件发展为面向机器人学习的具身智能数据采集系统。', cards: [
      { title: '具身智能数据采集', body: '核心价值是采集真实、可复用的人体示教数据，用于机器人学习。', points: ['流程级示教', '微动作细节', '数据集复用'] },
      { title: '机器人遥操作', body: '通过三设备手臂采集，把人的操作意图映射到机器人控制与数据生成。', points: ['上臂 · 前臂 · 手部', '低延迟控制', '输出前预览'] },
      { title: '沉浸式交互', body: '把可穿戴动作用作自然交互接口。', points: ['即穿即用', '实时反馈', '训练与仿真'] }
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
