"use client";

import { useMemo } from "react";
import { useLocale } from "../useLocale";
import { SiteHeader } from "../components/SiteHeader";

const copy = {
  en: { back: "Home", badge: 'Applications', title: 'Applications', lead: 'How SiriusCeption grows from wearable hardware into an embodied-intelligence data acquisition system for robot learning.', cards: [
      { title: 'Embodied data acquisition', body: 'The primary value is collecting realistic, reusable human demonstration data for robot learning.', points: ['Workflow-level demonstrations', 'Micro-action detail', 'Dataset reuse'] },
      { title: 'Robotic-arm teleoperation', body: 'Single-arm and dual-arm Sirius Nova kits map arm motion into robotic-arm operation and reusable control data.', points: ['Single-arm kit', 'Dual-arm kit', 'Robot-control data'] },
      { title: 'Humanoid full-body workflows', body: 'The full-body kit captures whole-body pose for humanoid robot teleoperation and motion-data workflows.', points: ['Full-body pose', 'Humanoid teleoperation', 'Motion-data workflow'] },
      { title: 'Immersive interaction', body: 'Use wearable motion as a natural interface.', points: ['Wear-and-go setup', 'Realtime feedback', 'Training and simulation'] }
    ] },
  zh: { back: "首页", badge: '应用', title: '应用场景', lead: 'SiriusCeption 如何从可穿戴硬件发展为面向机器人学习的具身智能数据采集系统。', cards: [
      { title: '具身智能数据采集', body: '核心价值是采集真实、可复用的人体示教数据，用于机器人学习。', points: ['流程级示教', '微动作细节', '数据集复用'] },
      { title: '机械臂遥操作', body: '单臂和双臂 Sirius Nova 套装把手臂动作映射到机械臂操作，并生成可复用控制数据。', points: ['单臂套装', '双臂套装', '机器人控制数据'] },
      { title: '人形机器人全身流程', body: '全身套装采集全身位姿，用于人形机器人遥操作和动作数据流程。', points: ['全身位姿', '人形机器人遥操作', '动作数据流程'] },
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
      <SiteHeader locale={locale} setLocale={setLocale} />

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
