"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "zh";

const copy = {
  en: {
    nav: { product: "Product", cases: "Applications", software: "Software", docs: "Docs", media: "Media", blog: "Blog", videos: "Videos" },
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
  const [locale, setLocale] = useState<Locale>("en");
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
          <a href="#product">{t.nav.product}</a>
          <a href="#cases">{t.nav.cases}</a>
          <a href="#software">{t.nav.software}</a>
          <a href="/docs">{t.nav.docs}</a>
          <a href="#media">{t.nav.media}</a>
          <a href="#blog">{t.nav.blog}</a>
          <a href="/videos">{t.nav.videos}</a>
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

      <section id="product" className="section product">
        <div className="section-title">
          <h2>{t.product.title}</h2>
          <p>{t.product.lead}</p>
        </div>
        <div className="cards reveal">
          <article className="card highlight">
            <h3>{t.product.cards[0].title}</h3>
            <p>{t.product.cards[0].lead}</p>
            <ul>
              <li>{t.product.cards[0].points[0]}</li>
              <li>{t.product.cards[0].points[1]}</li>
              <li>{t.product.cards[0].points[2]}</li>
            </ul>
          </article>
          <article className="card">
            <h3>{t.product.cards[1].title}</h3>
            <p>{t.product.cards[1].lead}</p>
            <ul>
              <li>{t.product.cards[1].points[0]}</li>
              <li>{t.product.cards[1].points[1]}</li>
              <li>{t.product.cards[1].points[2]}</li>
            </ul>
          </article>
          <article className="card">
            <h3>{t.product.cards[2].title}</h3>
            <p>{t.product.cards[2].lead}</p>
            <ul>
              <li>{t.product.cards[2].points[0]}</li>
              <li>{t.product.cards[2].points[1]}</li>
              <li>{t.product.cards[2].points[2]}</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="cases" className="section use-cases">
        <div className="section-title">
          <h2>{t.cases.title}</h2>
          <p>{t.cases.lead}</p>
        </div>
        <div className="case-grid reveal">
          <div className="case">
            <span className="tag">{t.cases.items[0].tag}</span>
            <h3>{t.cases.items[0].title}</h3>
            <p>{t.cases.items[0].body}</p>
          </div>
          <div className="case">
            <span className="tag">{t.cases.items[1].tag}</span>
            <h3>{t.cases.items[1].title}</h3>
            <p>{t.cases.items[1].body}</p>
          </div>
          <div className="case">
            <span className="tag">{t.cases.items[2].tag}</span>
            <h3>{t.cases.items[2].title}</h3>
            <p>{t.cases.items[2].body}</p>
          </div>
        </div>
      </section>

      <section id="software" className="section software">
        <div className="section-title">
          <h2>{locale === "en" ? "Software Platform" : "软件平台"}</h2>
          <p>
            {locale === "en"
              ? "A private companion software layer for device setup, motion visualization, teleoperation, and robot integration. Detailed operator screens are provided during deployment, not exposed on the public website."
              : "配套软件用于设备设置、动作可视化、遥操作与机器人集成。具体操作页面只在部署交付中提供，不在官网公开展示。"}
          </p>
        </div>
        <div className="software-steps reveal">
          <article className="step-card">
            <span className="step-index">01</span>
            <h3>{locale === "en" ? "Device setup" : "设备接入"}</h3>
            <p>{locale === "en" ? "Guided onboarding for SiriusCeption wearable nodes and receiver-side readiness." : "为 SiriusCeption 可穿戴节点与接收端就绪状态提供引导式接入。"}</p>
          </article>
          <article className="step-card">
            <span className="step-index">02</span>
            <h3>{locale === "en" ? "Motion preview" : "动作预览"}</h3>
            <p>{locale === "en" ? "Visualization tools help teams validate motion quality before using data downstream." : "通过可视化工具确认动作质量，再进入后续数据或控制流程。"}</p>
          </article>
          <article className="step-card">
            <span className="step-index">03</span>
            <h3>{locale === "en" ? "Teleoperation workflow" : "遥操作流程"}</h3>
            <p>{locale === "en" ? "Arm teleoperation is designed around a three-wearable interaction model for stable upper-limb mapping." : "手臂遥操作围绕三设备交互模型设计，以保证上肢映射稳定。"}</p>
          </article>
          <article className="step-card highlight-step">
            <span className="step-index">04</span>
            <h3>{locale === "en" ? "Robot integration" : "机器人集成"}</h3>
            <p>{locale === "en" ? "Robot-specific mapping and preview remain gated until the target hardware and safety workflow are confirmed." : "机器人映射与预览会在目标硬件和安全流程确认后再开放。"}</p>
          </article>
        </div>
      </section>

      <section id="media" className="section media">
        <div className="section-title">
          <h2>{t.media.title}</h2>
          <p>{t.media.lead}</p>
        </div>
        <div className="media-groups reveal">
          {t.media.groups.map((group) => (
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
          <a className="cta ghost media-more" href="/videos">
            {t.media.more}
          </a>
        </div>
      </section>

      <section id="blog" className="section blog">
        <div className="section-title">
          <h2>{t.blog.title}</h2>
          <p>{t.blog.lead}</p>
        </div>
        <div className="blog-grid reveal">
          <article className="blog-card">
            <span className="tag">{t.blog.items[0].tag}</span>
            <h3>{t.blog.items[0].title}</h3>
            <p>{t.blog.items[0].body}</p>
            <button className="cta ghost small">{locale === "en" ? "Read" : "阅读"}</button>
          </article>
          <article className="blog-card">
            <span className="tag">{t.blog.items[1].tag}</span>
            <h3>{t.blog.items[1].title}</h3>
            <p>{t.blog.items[1].body}</p>
            <button className="cta ghost small">{locale === "en" ? "Read" : "阅读"}</button>
          </article>
          <article className="blog-card">
            <span className="tag">{t.blog.items[2].tag}</span>
            <h3>{t.blog.items[2].title}</h3>
            <p>{t.blog.items[2].body}</p>
            <button className="cta ghost small">{locale === "en" ? "Read" : "阅读"}</button>
          </article>
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
