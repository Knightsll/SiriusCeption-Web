"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: { back: "Home", badge: 'Software', title: 'Data Acquisition Software Roadmap', lead: 'Software is positioned as the future control layer of the one-stop embodied-intelligence data acquisition system: device onboarding, quality checks, teleop, labeling, replay, and export.', cards: [
      { title: 'Device onboarding', body: 'Turn the current hardware product into a managed capture setup.', points: ['Node identity', 'Receiver readiness', 'Multi-device status'] },
      { title: 'Data quality validation', body: 'Check motion quality before data enters training or teleoperation workflows.', points: ['Pose preview', 'Signal quality checks', 'Calibration evidence'] },
      { title: 'Dataset workflow', body: 'The planned system connects sessions, labels, replay, and robot/simulation export.', points: ['Capture sessions', 'Label and replay', 'Robot-ready export'] }
    ] },
  zh: { back: "首页", badge: '软件', title: '数据采集软件路线', lead: '软件会成为一站式具身智能数据采集系统的控制层：设备接入、质量检查、遥操作、标注、回放和导出。', cards: [
      { title: '设备接入', body: '把当前硬件产品变成可管理的采集配置。', points: ['节点身份', '接收端就绪', '多设备状态'] },
      { title: '数据质量验证', body: '在数据进入训练或遥操作流程前检查动作质量。', points: ['姿态预览', '信号质量检查', '标定证据'] },
      { title: '数据集流程', body: '规划中的系统会串联采集会话、标签、回放和机器人/仿真导出。', points: ['采集会话', '标注与回放', '机器人可用数据导出'] }
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
