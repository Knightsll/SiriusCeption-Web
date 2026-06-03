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
      "Sirius Nova is the first SiriusCeption product: a compact wearable IMU node and hardware facility for embodied-intelligence data acquisition. It supports robotic-arm teleoperation data capture and 17-node humanoid full-body motion capture.",
    ctaPrimary: "Discuss deployment",
    ctaSecondary: "Read docs",
    metrics: [
      ["1–500 Hz", "Configurable UDP stream frequency per node"],
      ["≈39 × 65 × 24 mm", "Compact wearable enclosure model bounds"],
      ["17 nodes", "Humanoid full-body motion capture · €3,000 / set"]
    ],
    viewerEyebrow: "Interactive hardware",
    viewerTitle: "Inspect Sirius Nova in 3D",
    viewerLead:
      "Rotate the model to review the enclosure, USB-C opening, original inlay geometry, and wearable node proportions. Mobile devices now load the same 3D preview with a lighter renderer and keep static fallback for reduced-motion or failed WebGL.",
    positioningTitle: "Sirius Nova in the platform",
    positioningLead:
      "Sirius Nova is the hardware entry point into the SiriusCeption data acquisition platform: wearable motion capture today, then validated teleoperation sessions, replay, labeling, and robot-ready dataset export as the workflow matures.",
    positioning: [
      { title: "Hardware facility", body: "Wearable IMU nodes capture motion signals that become the foundation of embodied-intelligence datasets." },
      { title: "Platform context", body: "Nova connects the physical capture layer with validation software, teleoperation sessions, and robot-ready data export." },
      { title: "Data platform foundation", body: "Present Nova as the hardware facility for embodied-intelligence data acquisition, teleoperation capture, and robot-control dataset generation." }
    ],
    workflowTitle: "Two deployment configurations",
    workflow: [
      "Robotic-arm teleoperation: a Sirius Nova set for capturing robot-control demonstrations and motion-control data.",
      "Full-body motion capture: a 17-node Sirius Nova set for humanoid-robot motion data.",
      "Keep product messaging centered on Sirius Nova as the hardware product rather than naming the test device count as a product.",
      "Use the validation software to check device quality and motion mapping before production data capture."
    ],
    specsTitle: "Performance, specifications, and pricing",
    specs: [
      ["Product form", "Wearable wireless IMU motion-capture node"],
      ["Dimensions", "Approx. 39 × 65 × 24 mm from the Sirius Nova source model bounds"],
      ["Compute / network", "ESP32-C3 based node with Wi-Fi UDP streaming and USB-C serial configuration"],
      ["Stream frequency", "Configurable `udp_hz` / rate from 1–500 Hz; 100 Hz is the recommended first-run validation setting"],
      ["Motion output", "Quaternion orientation, gyroscope, and acceleration data streamed per node"],
      ["Precision model", "Calibration-backed orientation tracking; live packet rate, packet age, and signal quality checks verify whether a capture setup is ready"],
      ["Node management", "Unique saved node ID / slave_id for receiver binding, role assignment, and multi-node sessions"],
      ["Arm teleoperation", "Configured set for robotic-arm teleoperation data capture · €1,000 / set"],
      ["Full-body mocap", "17-node set for humanoid-robot full-body motion capture · €3,000 / set"],
      ["Software", "Validation and debugging tools for setup, signal quality, calibration, and motion mapping"]
    ]
  },
  zh: {
    back: "首页",
    nav: { overview: "概览", workflow: "工作流", specs: "规格", docs: "文档" },
    eyebrow: "Sirius Nova · 首款产品",
    title: "面向具身动作数据的可穿戴 IMU 节点",
    lead:
      "Sirius Nova 是 SiriusCeption 的第一个产品：一个面向具身智能数据采集的紧凑可穿戴 IMU 节点与硬件设施。它支持机械臂遥操作数据采集，也支持 17 节点人形机器人全身动作捕捉。",
    ctaPrimary: "沟通部署",
    ctaSecondary: "查看文档",
    metrics: [
      ["1–500 Hz", "单节点 UDP 数据发送频率可配置"],
      ["约 39 × 65 × 24 mm", "紧凑型可穿戴外壳模型边界"],
      ["17 节点", "人形机器人全身动作捕捉 · €3,000 / 套"]
    ],
    viewerEyebrow: "交互式硬件",
    viewerTitle: "以 3D 查看 Sirius Nova",
    viewerLead:
      "旋转模型查看外壳、USB-C 开口、原始 inlay 几何和可穿戴节点比例。移动端现在也会加载同一个 3D 预览，使用更轻量的 renderer；reduced-motion 或 WebGL 失败时仍回退到静态图。",
    positioningTitle: "Sirius Nova 在平台中的角色",
    positioningLead:
      "Sirius Nova 是进入 SiriusCeption 数据采集平台的硬件入口：当前承担可穿戴动作采集，后续连接经过验证的遥操作会话、回放、标注和面向机器人的数据集导出。",
    positioning: [
      { title: "硬件设施", body: "可穿戴 IMU 节点采集动作信号，形成具身智能数据集的硬件基础。" },
      { title: "平台语境", body: "Nova 连接物理采集层、验证软件、遥操作会话和面向机器人的数据导出。" },
      { title: "数据平台基础", body: "把 Nova 呈现为具身智能数据采集、遥操作采集和机器人控制数据生成的硬件设施。" }
    ],
    workflowTitle: "两种套装配置",
    workflow: [
      "机械臂遥操作：作为 Sirius Nova 的机器人控制示教与动作控制数据采集套装呈现。",
      "全身动作捕捉：使用 17 个 Sirius Nova 节点，面向人形机器人全身动作数据。",
      "产品表达以 Sirius Nova 硬件产品为中心，不把测试用设备数量写成独立产品。",
      "通过验证软件检查设备质量和动作映射，再进入正式数据采集。"
    ],
    specsTitle: "产品性能、规格与价格",
    specs: [
      ["产品形态", "可穿戴无线 IMU 动作捕捉节点"],
      ["尺寸", "根据 Sirius Nova 源模型边界，约 39 × 65 × 24 mm"],
      ["计算 / 网络", "基于 ESP32-C3 的节点，支持 Wi-Fi UDP 数据流与 USB-C 串口配置"],
      ["数据频率", "`udp_hz` / rate 可配置为 1–500 Hz；首次部署验证建议从 100 Hz 开始"],
      ["动作输出", "每个节点输出四元数姿态、陀螺仪和加速度数据"],
      ["精度模型", "通过标定支撑姿态跟踪；通过实时包频率、包延迟和信号质量检查确认采集条件是否达标"],
      ["节点管理", "每个节点保存唯一 node ID / slave_id，用于接收端绑定、角色分配和多节点会话"],
      ["机械臂遥操作", "机械臂遥操作数据采集套装 · €1,000 / 套"],
      ["全身动作捕捉", "17 节点人形机器人全身动作捕捉套装 · €3,000 / 套"],
      ["软件", "用于设备设置、信号质量、标定和动作映射验证的调试工具"]
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
