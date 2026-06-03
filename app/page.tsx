"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "./useLocale";
import { InteractiveDeviceModel } from "./components/InteractiveDeviceModel";

const copy = {
  en: {
    nav: { product: "Sirius Nova", cases: "Applications", software: "Software", docs: "Docs", media: "Videos", blog: "Blog", videos: "Videos" },
    cta: { demo: "Book a Demo", plan: "Get a Plan", deck: "Download Deck", contact: "Contact Us", pricing: "Get Pricing" },
    hero: {
      eyebrow: "First Product · Wearable IMU Node",
      title1: "Sirius Nova",
      title2: "Wearable motion capture",
      title3: "for embodied data acquisition",
      lead:
        "Sirius Nova is the first SiriusCeption product: a wearable IMU node and hardware facility for embodied-intelligence data acquisition, robotic teleoperation, and real-world robot-control datasets."
    },
    metrics: [
      { metric: "Hardware now", meta: "Wearable IMU capture" },
      { metric: "Robot data", meta: "Teleoperation · capture · control" },
      { metric: "Data platform next", meta: "Capture · label · replay · export" }
    ],
    product: {
      title: "Hardware foundation for an embodied data platform",
      lead: "Sirius Nova is the hardware foundation of the SiriusCeption embodied-intelligence data acquisition platform: capture motion, support teleoperation, and produce robot-ready datasets.",
      cards: [
        {
          title: "Wearable capture hardware",
          lead: "Reliable IMU nodes collect human motion as the first layer of the embodied data stack.",
          points: ["3D pose & motion reconstruction", "Arm-only and full-body expansion path", "Stable field-ready capture sessions"]
        },
        {
          title: "Robot teleoperation data",
          lead: "Arm teleoperation is one configuration for collecting robot-control data; the device count is an implementation detail, not the product identity.",
          points: ["Role-based device binding", "Calibration before capture", "Robot-control data generation"]
        },
        {
          title: "One-stop data pipeline",
          lead: "Future software layers will connect capture, quality checks, labels, replay, and export into one acquisition system.",
          points: ["Dataset session management", "Labeling and validation workflow", "Robot & simulation data export"]
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
          body: "End-to-end pipeline tactics from sensing to simulator preview."
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
      tagline: "Embodied Intelligence Data Acquisition System",
      locations: "Beijing · Shanghai · Shenzhen"
    }
  },
  zh: {
    nav: { product: "Sirius Nova", cases: "应用", software: "软件", docs: "文档", media: "视频", blog: "Blog", videos: "视频库" },
    cta: { demo: "预约演示", plan: "获取方案", deck: "下载产品手册", contact: "立即联系", pricing: "获取报价" },
    hero: {
      eyebrow: "首款产品 · 可穿戴 IMU 节点",
      title1: "Sirius Nova",
      title2: "可穿戴动作采集",
      title3: "面向具身智能数据采集",
      lead:
        "Sirius Nova 是 SiriusCeption 的第一个产品：一个面向具身智能数据采集、机器人遥操作和真实机器人控制数据集的可穿戴 IMU 节点与硬件设施。"
    },
    metrics: [
      { metric: "当前硬件产品", meta: "可穿戴 IMU 采集" },
      { metric: "机器人数据", meta: "遥操作 · 采集 · 控制" },
      { metric: "未来数据平台", meta: "采集 · 标注 · 回放 · 导出" }
    ],
    product: {
      title: "具身数据平台的硬件基础",
      lead: "Sirius Nova 是 SiriusCeption 具身智能数据采集平台的硬件基础：采集动作、支持遥操作，并产出面向机器人的可用数据集。",
      cards: [
        {
          title: "可穿戴采集硬件",
          lead: "以稳定的 IMU 节点采集人体动作，作为具身智能数据栈的第一层。",
          points: ["3D 姿态捕捉与动作重建", "从手臂版本扩展到全身采集", "支持高频真实场景采集"]
        },
        {
          title: "机器人遥操作数据",
          lead: "机械臂遥操作是采集机器人控制数据的一种配置；设备数量是实现细节，不是产品身份。",
          points: ["按角色绑定设备", "采集前完成标定", "生成机器人控制数据"]
        },
        {
          title: "一站式数据管线",
          lead: "后续软件能力会把采集、质量检查、标签、回放和导出串成完整数据采集系统。",
          points: ["数据集会话管理", "标注与质检流程", "机器人与仿真数据导出"]
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
      tagline: "具身智能数据采集系统",
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
          <a href="/products/sirius-nova">{t.nav.product}</a>
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

      <section className="section device-showcase reveal">
        <div className="device-showcase-copy">
          <p className="eyebrow">{locale === "en" ? "Sirius Nova · 3D Preview" : "Sirius Nova · 3D 预览"}</p>
          <h2>{locale === "en" ? "Inspect the first wearable IMU node in 3D" : "以 3D 方式查看首款可穿戴 IMU 节点"}</h2>
          <p>
            {locale === "en"
              ? "Sirius Nova is the tangible product on the site. Drag to inspect the enclosure, USB-C, inlay geometry, and wearable hardware details; on mobile, the same 3D viewer loads with a lighter renderer and falls back to a static render when needed."
              : "Sirius Nova 是官网中需要被明确呈现的实体产品。可以拖拽查看外壳、USB-C、原始 inlay 几何和可穿戴硬件细节；移动端也会加载轻量 3D 预览，必要时回退到静态渲染图。"}
          </p>
        </div>
        <InteractiveDeviceModel locale={locale} />
      </section>

      <section className="section overview-hub">
        <div className="section-title">
          <h2>{locale === "en" ? "Explore SiriusCeption" : "浏览 SiriusCeption"}</h2>
          <p>
            {locale === "en"
              ? "Sirius Nova is our first product, while SiriusCeption is the larger product system: Nova captures reliable wearable IMU data today and becomes the hardware entry point into capture, teleoperation, validation, replay, and export workflows."
              : "Sirius Nova 是我们的第一个产品，SiriusCeption 是更大的产品系统：Nova 负责当前稳定的可穿戴 IMU 数据采集，并作为采集、遥操作、质检、回放和导出流程的硬件入口。"}
          </p>
        </div>
        <div className="hub-grid reveal">
          <a className="hub-card highlight" href="/products/sirius-nova">
            <span className="step-index">01</span>
            <h3>{locale === "en" ? "Sirius Nova" : "Sirius Nova"}</h3>
            <p>{locale === "en" ? "Our first wearable IMU product: hardware for embodied-intelligence data acquisition and robot-control datasets." : "我们的首款可穿戴 IMU 产品：面向具身智能数据采集和机器人控制数据集的硬件设施。"}</p>
          </a>
          <a className="hub-card" href="/applications">
            <span className="step-index">02</span>
            <h3>{locale === "en" ? "Applications" : "应用"}</h3>
            <p>{locale === "en" ? "Embodied-AI data, teleoperation, and immersive interaction scenarios." : "具身智能数据、遥操作和沉浸式交互场景。"}</p>
          </a>
          <a className="hub-card" href="/software">
            <span className="step-index">03</span>
            <h3>{locale === "en" ? "Software" : "软件"}</h3>
            <p>{locale === "en" ? "Validation tools for device setup, signal quality, calibration, and motion mapping before data capture." : "用于正式采集前的设备设置、信号质量、标定和动作映射验证工具。"}</p>
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
