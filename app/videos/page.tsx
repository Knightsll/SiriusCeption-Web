"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: {
    title: "Video Library",
    lead: "All pose tracking and teleoperation demos.",
    back: "Back to Home",
    groups: [
      {
        title: "Pose Tracking",
        items: [
          { title: "Full-body Pose Tracking", url: "https://www.youtube.com/embed/IEHnCtcOQJ8" },
          { title: "Stairs Pose Tracking", url: "https://www.youtube.com/embed/XBAhqwampGY" }
        ]
      },
      {
        title: "Teleoperation",
        items: [
          { title: "PiPER Arm Teleoperation", url: "https://www.youtube.com/embed/z-4OFV3XAUA" },
          { title: "PiPER Threading", url: "https://www.youtube.com/embed/xzbbswhcN34" },
          { title: "ABB Yumi Teleoperation", url: "https://www.youtube.com/embed/Q75OV8lVS-o" }
        ]
      }
    ]
  },
  zh: {
    title: "视频库",
    lead: "完整的姿态跟踪与遥操作演示。",
    back: "返回首页",
    groups: [
      {
        title: "姿态跟踪",
        items: [
          { title: "全身姿态跟踪", url: "https://www.youtube.com/embed/IEHnCtcOQJ8" },
          { title: "上下楼梯姿态跟踪", url: "https://www.youtube.com/embed/XBAhqwampGY" }
        ]
      },
      {
        title: "遥操作",
        items: [
          { title: "PiPER 机械臂遥操作", url: "https://www.youtube.com/embed/z-4OFV3XAUA" },
          { title: "PiPER 穿针引线", url: "https://www.youtube.com/embed/xzbbswhcN34" },
          { title: "ABB Yumi 机械臂遥操作", url: "https://www.youtube.com/embed/Q75OV8lVS-o" }
        ]
      }
    ]
  }
} as const;

export default function VideosPage() {
  const [locale, setLocale] = useLocale();
  const t = useMemo(() => copy[locale], [locale]);

  return (
    <main className="page videos-page" data-locale={locale}>
      <div className="bg-ambient" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="orb orb-c" aria-hidden="true" />

      <header className="nav">
        <div className="brand">
          <span className="brand-mark">SC</span>
          <span className="brand-name">SiriusCeption</span>
        </div>
        <div className="nav-actions">
          <div className="lang-select">
            <select value={locale} onChange={(e) => setLocale(e.target.value as Locale)} aria-label="Language">
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <a className="cta ghost" href="/">
            {t.back}
          </a>
        </div>
      </header>

      <section className="section video-hero">
        <div className="section-title">
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>
        <div className="media-groups reveal">
          {t.groups.map((group) => (
            <div className="media-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="media-grid">
                {group.items.map((item) => (
                  <div className="media-card" key={item.title}>
                    <div className="media-embed">
                      <iframe
                        src={item.url}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="media-meta">
                      <span>{item.title}</span>
                      <button className="cta ghost small">{locale === "en" ? "Watch" : "观看"}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
