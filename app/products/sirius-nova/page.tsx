"use client";

import { useMemo } from "react";
import { InteractiveDeviceModel } from "../../components/InteractiveDeviceModel";
import { useLocale, type Locale } from "../../useLocale";

const copy = {
  en: {
    back: "Home",
    nav: { overview: "Overview", workflow: "Workflow", specs: "Specs", docs: "Docs" },
    eyebrow: "Sirius Nova · First Product",
    title: "Wearable IMU node for embodied motion data",
    lead:
      "Sirius Nova is the first SiriusCeption product: a compact wearable IMU node for embodied motion data. It can be configured as a set for robotic-arm teleoperation or as a 17-node set for humanoid full-body motion capture.",
    ctaPrimary: "Discuss deployment",
    ctaSecondary: "Read docs",
    metrics: [
      ["Arm set", "Robotic-arm teleoperation · €1,000 / set"],
      ["17 nodes", "Humanoid full-body motion capture · €3,000 / set"],
      ["3D view", "Desktop and mobile product inspection"]
    ],
    viewerEyebrow: "Interactive hardware",
    viewerTitle: "Inspect Sirius Nova in 3D",
    viewerLead:
      "Rotate the model to review the enclosure, USB-C opening, original inlay geometry, and wearable node proportions. Mobile devices now load the same 3D preview with a lighter renderer and keep static fallback for reduced-motion or failed WebGL.",
    positioningTitle: "How the website should present it",
    positioningLead:
      "Sirius Nova should be framed as the concrete product users can understand and evaluate now. SiriusCeption remains the broader system vision: capture hardware today, then receiver software, teleop, validation, replay, labeling, and robot/simulator export as the workflow matures.",
    positioning: [
      { title: "Product first", body: "Lead with Sirius Nova as the physical product instead of making the homepage feel like only an abstract data platform." },
      { title: "System context", body: "Explain that Nova is the hardware entry point into the larger SiriusCeption embodied data acquisition system." },
      { title: "Simulator-first", body: "Keep public-facing control language careful: preview and debug in simulator, not direct real-robot operation from the website UI." }
    ],
    workflowTitle: "Two deployment configurations",
    workflow: [
      "Robotic-arm teleoperation: a Sirius Nova set for mechanical-arm motion mapping and simulator preview.",
      "Full-body motion capture: a 17-node Sirius Nova set for humanoid-robot motion data.",
      "Keep product messaging centered on Sirius Nova as the hardware product rather than naming the test device count as a product.",
      "Use receiver software and simulator views to validate motion before production data capture."
    ],
    specsTitle: "Specs and pricing",
    specs: [
      ["Form", "Wearable wireless IMU node"],
      ["Role", "Motion capture hardware layer"],
      ["Arm teleoperation", "Configured set for robotic-arm use · €1,000 / set"],
      ["Full-body mocap", "17-node set for humanoid-robot motion capture · €3,000 / set"],
      ["Software", "Receiver monitor, node config, pose visualizer, simulator preview"],
      ["Direction", "Foundation for the future SiriusCeption data workflow"]
    ]
  },
  zh: {
    back: "首页",
    nav: { overview: "概览", workflow: "工作流", specs: "规格", docs: "文档" },
    eyebrow: "Sirius Nova · 首款产品",
    title: "面向具身动作数据的可穿戴 IMU 节点",
    lead:
      "Sirius Nova 是 SiriusCeption 的第一个产品：一个面向具身动作数据的紧凑可穿戴 IMU 节点。它可以配置为机械臂遥操作套装，也可以配置为面向人形机器人的 17 节点全身动作捕捉套装。",
    ctaPrimary: "沟通部署",
    ctaSecondary: "查看文档",
    metrics: [
      ["机械臂套装", "机械臂遥操作 · €1,000 / 套"],
      ["17 节点", "人形机器人全身动作捕捉 · €3,000 / 套"],
      ["3D 查看", "桌面与移动端产品检查"]
    ],
    viewerEyebrow: "交互式硬件",
    viewerTitle: "以 3D 查看 Sirius Nova",
    viewerLead:
      "旋转模型查看外壳、USB-C 开口、原始 inlay 几何和可穿戴节点比例。移动端现在也会加载同一个 3D 预览，使用更轻量的 renderer；reduced-motion 或 WebGL 失败时仍回退到静态图。",
    positioningTitle: "官网应该如何呈现它",
    positioningLead:
      "Sirius Nova 应该作为用户现在可以理解和评估的具体产品被优先呈现。SiriusCeption 则保留为更大的系统愿景：当前是采集硬件，之后逐步连接接收端软件、遥操作、质检、回放、标注和机器人/仿真数据导出。",
    positioning: [
      { title: "产品优先", body: "首页先讲清楚 Sirius Nova 这个实体产品，避免只像一个抽象数据平台。" },
      { title: "系统语境", body: "说明 Nova 是进入 SiriusCeption 具身智能数据采集系统的硬件入口。" },
      { title: "Simulator-first", body: "公开页面的控制表述要谨慎：强调 simulator 预览和调试，而不是官网 UI 直接控制真实机器人。" }
    ],
    workflowTitle: "两种套装配置",
    workflow: [
      "机械臂遥操作：作为 Sirius Nova 的机械臂动作映射与仿真预览套装呈现。",
      "全身动作捕捉：使用 17 个 Sirius Nova 节点，面向人形机器人全身动作数据。",
      "产品表达以 Sirius Nova 硬件产品为中心，不把测试用设备数量写成独立产品。",
      "通过接收端软件和仿真视图验证动作，再进入正式数据采集。"
    ],
    specsTitle: "规格与价格",
    specs: [
      ["形态", "可穿戴无线 IMU 节点"],
      ["角色", "动作捕捉硬件层"],
      ["机械臂遥操作", "机械臂应用套装 · €1,000 / 套"],
      ["全身动作捕捉", "17 节点人形机器人动作捕捉套装 · €3,000 / 套"],
      ["软件", "接收端监控、节点配置、姿态可视化、仿真预览"],
      ["方向", "未来 SiriusCeption 数据工作流的基础"]
    ]
  }
} as const;

export default function SiriusNovaPage() {
  const [locale, setLocale] = useLocale();
  const t = useMemo(() => copy[locale], [locale]);

  return (
    <main className="page nova-page" data-locale={locale}>
      <div className="bg-ambient" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <header className="nav">
        <a className="brand" href="/">
          <span className="brand-mark">SC</span>
          <span className="brand-name">SiriusCeption</span>
        </a>
        <nav className="nav-links">
          <a href="#overview">{t.nav.overview}</a>
          <a href="#workflow">{t.nav.workflow}</a>
          <a href="#specs">{t.nav.specs}</a>
          <a href="/docs">{t.nav.docs}</a>
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

      <section className="section nova-hero" id="overview">
        <div className="nova-hero-copy reveal">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <div className="hero-actions">
            <a className="cta primary" href="mailto:hello@siriusception.ai">{t.ctaPrimary}</a>
            <a className="cta ghost" href="/docs">{t.ctaSecondary}</a>
          </div>
          <div className="nova-metrics">
            {t.metrics.map(([metric, meta]) => (
              <div key={metric}>
                <strong>{metric}</strong>
                <span>{meta}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="nova-hero-model reveal delay-1">
          <InteractiveDeviceModel locale={locale} />
        </div>
      </section>

      <section className="section nova-product-view">
        <div className="section-title">
          <p className="eyebrow">{t.viewerEyebrow}</p>
          <h2>{t.viewerTitle}</h2>
          <p>{t.viewerLead}</p>
        </div>
      </section>

      <section className="section nova-positioning">
        <div className="section-title">
          <h2>{t.positioningTitle}</h2>
          <p>{t.positioningLead}</p>
        </div>
        <div className="cards reveal">
          {t.positioning.map((item, index) => (
            <article className={`card ${index === 0 ? "highlight" : ""}`} key={item.title}>
              <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section nova-workflow" id="workflow">
        <div className="section-title">
          <h2>{t.workflowTitle}</h2>
        </div>
        <div className="nova-flow reveal">
          {t.workflow.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section nova-specs" id="specs">
        <div className="section-title">
          <h2>{t.specsTitle}</h2>
        </div>
        <div className="config-grid nova-spec-grid reveal">
          {t.specs.map(([label, value]) => (
            <div className="config-row" key={label}>
              <code>{label}</code>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
