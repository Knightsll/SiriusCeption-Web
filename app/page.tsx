"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "./useLocale";

const copy = {
  en: {
    nav: { product: "Product", cases: "Applications", software: "Software", docs: "Docs", media: "Videos", blog: "Blog", videos: "Videos" },
    cta: { demo: "Book a Demo", plan: "Get a Plan", deck: "Download Deck", contact: "Contact Us", pricing: "Get Pricing" },
    hero: {
      eyebrow: "Embodied Intelligence Data Engine",
      title1: "SiriusCeption",
      title2: "Full-body Motion Tracking",
      title3: "Make robots truly understand human actions",
      lead:
        "Wearable full-body and arm-only versions, built for embodied intelligence data capture and robot teleoperation. Wear-and-collect, low-friction labeling, immersive control."
    },
    metrics: [
      { metric: "17+ joints", meta: "High-precision pose capture" },
      { metric: "Millisecond latency", meta: "Real-time teleoperation" },
      { metric: "Multi-platform API", meta: "Robots & simulation ready" }
    ],
    product: {
      title: "Versions for Every Scenario",
      lead: "Full-body and arm-only versions cover the full pipeline from motion capture to robot teleoperation.",
      cards: [
        {
          title: "Full-body Control",
          lead: "Capture torso, limbs, and joints for complex motions and multi-modal behaviors.",
          points: ["3D full-body pose & motion reconstruction", "Human-robot & simulation mapping", "Motion library & batch labeling"]
        },
        {
          title: "Arm-only Control",
          lead: "Lightweight deployment for fast teleoperation workflows, ideal for mobile arms and cobots.",
          points: ["Lower cost, high-frequency capture", "Plug-and-play calibration", "Combine with vision & force control"]
        },
        {
          title: "Extensible Stack",
          lead: "Multi-device collaboration, sensor fusion, and custom labels form a reusable data pipeline.",
          points: ["Open SDK & data formats", "Fleet monitoring & management", "Automated capture & replay"]
        }
      ]
    },
    cases: {
      title: "Core Value for Embodied AI",
      lead: "More realistic data, more natural teleoperation, more efficient robot training.",
      items: [
        {
          tag: "Data Capture",
          title: "Training data for embodied AI",
          body: "Use human motion as high-quality priors to capture full workflows and micro-gestures, boosting policy learning efficiency."
        },
        {
          tag: "Teleoperation",
          title: "Real-time robot control",
          body: "Low-latency mapping and motion reconstruction for remote work, hazardous environments, and complex collaboration."
        },
        {
          tag: "Immersive",
          title: "Natural interaction experience",
          body: "Wear-and-go, real-time sync with feedback. Fast onboarding and stable, high-quality motion output."
        }
      ]
    },
    media: {
      title: "Videos & Demos",
      lead: "Pose tracking and teleoperation demos.",
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
      ],
      more: "View all videos"
    },
    blog: {
      title: "Blog / Research Updates",
      lead: "Show project updates, technical articles, and collaborations.",
      items: [
        {
          tag: "Data",
          title: "Building a high-quality embodied motion library",
          body: "Motion decomposition, labeling systems, and capture workflows to raise dataset value."
        },
        {
          tag: "Teleoperation",
          title: "Low-latency link optimization for teleop systems",
          body: "End-to-end pipeline tactics from sensing to control output."
        },
        {
          tag: "Hardware",
          title: "Calibration and maintenance for wearable trackers",
          body: "Reliability tests and maintenance playbook for high-frequency use."
        }
      ]
    },
    closing: {
      title: "Ready to teach robots real-world motions?",
      lead: "Talk to the SiriusCeption team to deploy embodied data and teleoperation workflows."
    },
    footer: {
      tagline: "Embodied Data & Teleoperation Platform",
      locations: "Beijing · Shanghai · Shenzhen"
    }
  },
  zh: {
    nav: { product: "产品", cases: "应用", software: "软件", docs: "文档", media: "视频", blog: "Blog", videos: "视频库" },
    cta: { demo: "预约演示", plan: "获取方案", deck: "下载产品手册", contact: "立即联系", pricing: "获取报价" },
    hero: {
      eyebrow: "具身智能数据引擎",
      title1: "SiriusCeption",
      title2: "全身姿态跟踪",
      title3: "让机器人真正理解人类动作",
      lead:
        "可穿戴全身与手臂姿态控制版本，专为具身智能数据采集与机器人遥操作打造。即穿即采、低门槛标注、沉浸式控制体验。"
    },
    metrics: [
      { metric: "全身 17+ 关节", meta: "高精度姿态捕捉" },
      { metric: "毫秒级延迟", meta: "遥操作实时控制" },
      { metric: "多平台 API", meta: "接入机器人与仿真" }
    ],
    product: {
      title: "多版本覆盖多场景",
      lead: "全身姿态控制与手臂姿态控制版本，满足从动作采集到机器人遥操作的完整链路。",
      cards: [
        {
          title: "全身姿态控制版本",
          lead: "完整覆盖躯干、四肢与关节动捕，支持复杂动作、多模态操作行为采集。",
          points: ["全身 3D 姿态捕捉与动作重建", "适配人形机器人与仿真平台", "动作库沉淀与批量标注"]
        },
        {
          title: "手臂姿态控制版本",
          lead: "聚焦上肢动作，轻量部署，快速建立遥操作流程，适合移动机械臂与协作机器人。",
          points: ["低成本高频采集", "即插即用校准", "可与视觉/力控结合"]
        },
        {
          title: "可扩展能力",
          lead: "支持多机协同、传感器融合与自定义动作标签，形成可复用的具身智能数据管线。",
          points: ["开放 SDK 与数据格式", "多终端监控与管理", "自动化采集与回放"]
        }
      ]
    },
    cases: {
      title: "面向具身智能的核心价值",
      lead: "让数据更真实、遥操作更自然、机器人训练更高效。",
      items: [
        {
          tag: "数据采集",
          title: "具身智能训练数据",
          body: "以人的动作作为高质量先验，捕捉完整操作流程与微观动作细节，显著提升策略学习效率。"
        },
        {
          tag: "遥操作",
          title: "机器人实时控制",
          body: "低延迟姿态映射与动作重建，支持远程作业、危险环境操控与复杂协作任务。"
        },
        {
          tag: "沉浸式",
          title: "自然交互体验",
          body: "佩戴即用，动作与反馈实时同步，训练人员上手快，持续稳定输出高质量动作数据。"
        }
      ]
    },
    media: {
      title: "宣传视频与演示",
      lead: "姿态跟踪与遥操作演示。",
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
      ],
      more: "查看全部视频"
    },
    blog: {
      title: "Blog / 研究与进展",
      lead: "展示项目动态、技术文章与合作案例。",
      items: [
        { tag: "数据", title: "如何构建高质量具身智能动作库", body: "介绍动作分解、标签体系与采集流程设计，提升训练数据价值。" },
        { tag: "遥操作", title: "遥操作系统的低延迟链路优化", body: "从感知、融合到控制输出的全链路优化策略与实践建议。" },
        { tag: "硬件", title: "可穿戴姿态设备的标定与维护", body: "高频运行环境下的可靠性测试与维护指南。" }
      ]
    },
    closing: {
      title: "准备好让机器人“学会动作”了吗？",
      lead: "与 SiriusCeption 团队沟通部署方案，开启具身智能数据与遥操作实践。"
    },
    footer: {
      tagline: "具身智能数据与遥操作平台",
      locations: "北京 · 上海 · 深圳"
    }
  }
} as const;

export default function Home() {
  const [locale, setLocale] = useLocale();
  const t = useMemo(() => copy[locale], [locale]);

  return (
    <main className="page" data-locale={locale}>
      <div className="bg-ambient" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="orb orb-c" aria-hidden="true" />
      <header className="nav">
        <div className="brand">
          <span className="brand-mark">SC</span>
          <span className="brand-name">SiriusCeption</span>
        </div>
        <nav className="nav-links">
          <a href="/product">{t.nav.product}</a>
          <a href="/applications">{t.nav.cases}</a>
          <a href="/software">{t.nav.software}</a>
          <a href="/docs">{t.nav.docs}</a>
          <a href="/videos">{t.nav.media}</a>
          <a href="/blog">{t.nav.blog}</a>
        </nav>
        <div className="nav-actions">
          <div className="lang-select">
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
              aria-label="Language"
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <button className="cta primary">{t.cta.demo}</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text reveal">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>
            {t.hero.title1} <span>{t.hero.title2}</span>
            <br />
            {t.hero.title3}
          </h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="hero-actions">
            <button className="cta primary">{t.cta.plan}</button>
            <button className="cta ghost">{t.cta.deck}</button>
          </div>
          <div className="hero-metrics">
            <div>
              <span className="metric">{t.metrics[0].metric}</span>
              <span className="meta">{t.metrics[0].meta}</span>
            </div>
            <div>
              <span className="metric">{t.metrics[1].metric}</span>
              <span className="meta">{t.metrics[1].meta}</span>
            </div>
            <div>
              <span className="metric">{t.metrics[2].metric}</span>
              <span className="meta">{t.metrics[2].meta}</span>
            </div>
          </div>
        </div>
        <div className="hero-visual reveal delay-1">
          <div className="device-card">
            <div className="device-glow" />
            <div className="device-frame">
              <div className="device-screen">
                <span className="pulse" />
                <p>{locale === "en" ? "Full-body capture · Robot mapping" : "全身捕捉 · 机器人映射"}</p>
                <small>{locale === "en" ? "Real-time sensor fusion" : "实时传感器融合"}</small>
              </div>
              <div className="device-stats">
                <div>
                  <strong>96Hz</strong>
                  <span>{locale === "en" ? "Sampling" : "采样率"}</span>
                </div>
                <div>
                  <strong>0.8°</strong>
                  <span>{locale === "en" ? "Pose error" : "姿态误差"}</span>
                </div>
                <div>
                  <strong>{locale === "en" ? "Wireless" : "无线"}</strong>
                  <span>{locale === "en" ? "Freedom" : "自由移动"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="signal-lines" aria-hidden="true" />
          <div className="data-stream" aria-hidden="true" />
          <div className="robot-hologram" aria-hidden="true">
            <div className="robot-core">
              <div className="robot-head" />
              <div className="robot-body" />
              <div className="robot-arm left" />
              <div className="robot-arm right" />
              <div className="robot-leg left" />
              <div className="robot-leg right" />
              <div className="scan-lines" />
            </div>
          </div>
        </div>
      </section>

      <section className="section overview-hub">
        <div className="section-title">
          <h2>{locale === "en" ? "Explore SiriusCeption" : "浏览 SiriusCeption"}</h2>
          <p>
            {locale === "en"
              ? "The website is now split into focused pages so the homepage stays clear while deeper product, application, software, media, and research content can grow independently."
              : "官网已拆分为独立页面：首页保持清晰，产品、应用、软件、视频和研究内容可以分别扩展。"}
          </p>
        </div>
        <div className="hub-grid reveal">
          <a className="hub-card highlight" href="/product">
            <span className="step-index">01</span>
            <h3>{locale === "en" ? "Product" : "产品"}</h3>
            <p>{locale === "en" ? "Hardware versions, sensing stack, and system capabilities." : "硬件版本、传感栈与系统能力。"}</p>
          </a>
          <a className="hub-card" href="/applications">
            <span className="step-index">02</span>
            <h3>{locale === "en" ? "Applications" : "应用"}</h3>
            <p>{locale === "en" ? "Embodied-AI data, teleoperation, and immersive interaction scenarios." : "具身智能数据、遥操作和沉浸式交互场景。"}</p>
          </a>
          <a className="hub-card" href="/software">
            <span className="step-index">03</span>
            <h3>{locale === "en" ? "Software" : "软件"}</h3>
            <p>{locale === "en" ? "High-level companion software story without exposing operator details." : "只展示配套软件定位，不公开具体操作细节。"}</p>
          </a>
          <a className="hub-card" href="/videos">
            <span className="step-index">04</span>
            <h3>{locale === "en" ? "Videos" : "视频"}</h3>
            <p>{locale === "en" ? "Pose tracking and robot teleoperation demos." : "姿态跟踪与机器人遥操作演示。"}</p>
          </a>
          <a className="hub-card" href="/blog">
            <span className="step-index">05</span>
            <h3>{locale === "en" ? "Blog" : "Blog"}</h3>
            <p>{locale === "en" ? "Research updates, technical notes, and collaboration stories." : "研究进展、技术文章与合作案例。"}</p>
          </a>
          <a className="hub-card" href="/docs">
            <span className="step-index">06</span>
            <h3>{locale === "en" ? "Docs" : "文档"}</h3>
            <p>{locale === "en" ? "Product guide and deployment-facing documentation." : "产品指南与面向交付的文档。"}</p>
          </a>
        </div>
      </section>

      <section className="section closing">
        <div className="closing-inner">
          <div>
            <h2>{t.closing.title}</h2>
            <p>{t.closing.lead}</p>
          </div>
          <div className="closing-actions">
            <button className="cta primary">{t.cta.contact}</button>
            <button className="cta ghost">{t.cta.pricing}</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>SiriusCeption</strong>
          <p>{t.footer.tagline}</p>
        </div>
        <div className="footer-links">
          <span>{t.footer.locations}</span>
          <span>hello@siriusception.ai</span>
          <span>+86 010-0000-0000</span>
        </div>
      </footer>
    </main>
  );
}
