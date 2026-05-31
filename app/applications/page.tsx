"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "zh";

const copy = {
  en: { back: "Home", badge: 'Applications', title: 'Applications', lead: 'How SiriusCeption turns human motion into robot control signals, embodied-AI data, and interactive experiences.', cards: [
      { title: 'Embodied-AI data', body: 'Capture realistic human demonstrations for policy learning.', points: ['Workflow-level demonstrations', 'Micro-action detail', 'Reusable datasets'] },
      { title: 'Robot teleoperation', body: 'Map human movement into remote or local robot operation.', points: ['Low-latency control', 'Hazardous-environment operation', 'Mobile arm workflows'] },
      { title: 'Immersive interaction', body: 'Use wearable motion as a natural interface.', points: ['Wear-and-go setup', 'Realtime feedback', 'Training and simulation'] }
    ] },
  zh: { back: "首页", badge: '应用', title: '应用场景', lead: 'SiriusCeption 如何把人体动作转化为机器人控制、具身智能数据和交互体验。', cards: [
      { title: '具身智能数据', body: '采集真实人体示教，用于策略学习。', points: ['流程级示教', '微动作细节', '可复用数据集'] },
      { title: '机器人遥操作', body: '将人体动作映射到远程或本地机器人操作。', points: ['低延迟控制', '危险环境作业', '移动机械臂流程'] },
      { title: '沉浸式交互', body: '把可穿戴动作用作自然交互接口。', points: ['即穿即用', '实时反馈', '训练与仿真'] }
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
