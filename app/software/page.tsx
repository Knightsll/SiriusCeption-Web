"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: {
    back: "Home",
    badge: "Software",
    title: "Simulator-first software for wearable robot teleop",
    lead:
      "SiriusCeption software turns device setup, three-IMU role binding, calibration, and robot preview into a beginner-friendly workflow. The public software experience is simulator-only: it teaches the flow and previews motion without exposing protected teleop internals or operating a physical robot.",
    heroActions: { primary: "View workflow", secondary: "Read docs" },
    stats: [
      { value: "3", label: "required IMU devices" },
      { value: "0", label: "real robot commands from public UI" },
      { value: "URDF", label: "safe simulator preview" }
    ],
    cockpit: {
      title: "Control Center flow",
      subtitle: "From nodes to simulator preview",
      devices: [
        { role: "Upper Arm", id: "ID 01", state: "Online", hint: "shoulder reference" },
        { role: "Forearm", id: "ID 02", state: "Online", hint: "elbow motion" },
        { role: "Hand", id: "ID 03", state: "Online", hint: "wrist + gripper preview" }
      ],
      checks: ["unique IDs", "live UDP", "calibrated", "simulator ready"],
      command: "preview.mode = simulator_only\nroles = upper + fore + hand\noutput = URDF motion preview"
    },
    cards: [
      {
        title: "Device setup & status",
        body: "Guide users from hardware connection to a reliable receiver state before any teleop workflow starts.",
        points: ["Node identity", "Receiver readiness", "Online / stale status"]
      },
      {
        title: "Three-device role binding",
        body: "Before control starts, users explicitly map different SiriusCeption device IDs to upper arm, forearm, and hand.",
        points: ["Upper arm ID", "Forearm ID", "Hand ID", "Duplicate-ID protection"]
      },
      {
        title: "Calibration & safe preview",
        body: "The UI walks beginners through calibration and keeps algorithm details inside the protected backend layer.",
        points: ["Guided calibration", "Backend-only teleop logic", "Graceful error recovery"]
      },
      {
        title: "Real URDF simulator",
        body: "Robot Control is a simulator learning view: users see robot motion and gripper preview without sending commands to real hardware.",
        points: ["URDF model preview", "Joint-limit feedback", "Simulator-only operation"]
      }
    ],
    workflowTitle: "Beginner-safe interaction design",
    workflowLead: "The interface is intentionally staged so users cannot skip the three-device requirements.",
    workflow: [
      { step: "01", title: "Connect receiver", body: "Start the local client, confirm UDP receiver status, and see which IMU nodes are online." },
      { step: "02", title: "Bind three roles", body: "Assign one unique device to upper arm, one to forearm, and one to hand. Duplicate IDs are blocked before calibration." },
      { step: "03", title: "Calibrate together", body: "A guided calibration step establishes a safe reference pose before any live preview is allowed." },
      { step: "04", title: "Preview in simulator", body: "Robot Control renders motion in a URDF-based simulator and shows command previews as learning/debug information only." }
    ],
    simulator: {
      title: "Simulator-only Robot Control",
      lead: "The software page presents Robot Control as a learning and validation surface, not a public hardware controller.",
      points: [
        "Users can inspect model selection, joint limits, and URDF motion behavior.",
        "The UI communicates that protected backend logic owns teleop computation.",
        "Any future hardware publishing should require an operator gate outside the public marketing site."
      ],
      labels: ["Unitree Z1 URDF", "SO-100 profile", "Panda / UR / xArm previews"]
    }
  },
  zh: {
    back: "首页",
    badge: "软件",
    title: "以 Simulator 为核心的可穿戴遥操作软件",
    lead:
      "SiriusCeption 软件把设备接入、三 IMU 角色绑定、标定和机器人预览做成新手友好的流程。公开软件体验仅用于 simulator：用于理解流程和预览动作，不暴露受保护的 teleop 内部逻辑，也不直接控制真实机械臂。",
    heroActions: { primary: "查看流程", secondary: "阅读文档" },
    stats: [
      { value: "3", label: "必需 IMU 设备" },
      { value: "0", label: "公开 UI 真实机器人指令" },
      { value: "URDF", label: "安全 simulator 预览" }
    ],
    cockpit: {
      title: "Control Center 流程",
      subtitle: "从节点到 simulator preview",
      devices: [
        { role: "上臂", id: "ID 01", state: "Online", hint: "肩部参考" },
        { role: "前臂", id: "ID 02", state: "Online", hint: "肘部运动" },
        { role: "手部", id: "ID 03", state: "Online", hint: "腕部 + gripper preview" }
      ],
      checks: ["ID 唯一", "UDP 在线", "已标定", "simulator ready"],
      command: "preview.mode = simulator_only\nroles = upper + fore + hand\noutput = URDF motion preview"
    },
    cards: [
      {
        title: "设备接入与状态",
        body: "先引导用户完成硬件连接与接收端状态确认，再进入任何遥操作流程。",
        points: ["节点身份", "接收端就绪", "在线 / stale 状态"]
      },
      {
        title: "三设备角色绑定",
        body: "启动控制前，用户必须把不同的 SiriusCeption 设备 ID 明确绑定到上臂、前臂和手部。",
        points: ["上臂 ID", "前臂 ID", "手部 ID", "重复 ID 防护"]
      },
      {
        title: "标定与安全预览",
        body: "UI 引导新手完成标定，同时把末端计算与 gripper 等核心逻辑保留在受保护的后端层。",
        points: ["引导式标定", "后端封装遥操作逻辑", "异常不中断全局"]
      },
      {
        title: "Real URDF Simulator",
        body: "Robot Control 是 simulator 学习视图：用户可以看到机器人动作和 gripper preview，但不会向真实硬件发送控制命令。",
        points: ["URDF 模型预览", "关节限位反馈", "仅 simulator 操作"]
      }
    ],
    workflowTitle: "面向新手的安全交互设计",
    workflowLead: "界面按阶段推进，避免用户跳过三设备要求。",
    workflow: [
      { step: "01", title: "连接接收端", body: "启动本地客户端，确认 UDP receiver 状态，并看到哪些 IMU 节点在线。" },
      { step: "02", title: "绑定三个角色", body: "一个设备绑定上臂，一个绑定前臂，一个绑定手部；重复 ID 会在标定前被阻止。" },
      { step: "03", title: "统一标定", body: "引导式标定建立安全参考姿态，然后才允许进入 live preview。" },
      { step: "04", title: "进入 simulator 预览", body: "Robot Control 用 URDF simulator 渲染动作，command preview 仅作为学习与调试信息。" }
    ],
    simulator: {
      title: "仅 Simulator 的 Robot Control",
      lead: "Software 页面把 Robot Control 定位为学习和验证界面，不是公开的硬件控制器。",
      points: [
        "用户可以查看模型选择、关节限位和 URDF 动作表现。",
        "UI 明确传达：受保护后端负责 teleop 计算逻辑。",
        "未来如果加入硬件发布，应在公开官网之外增加 operator gate。"
      ],
      labels: ["Unitree Z1 URDF", "SO-100 profile", "Panda / UR / xArm previews"]
    }
  }
} as const;

export default function SoftwarePage() {
  const [locale, setLocale] = useLocale();
  const t = useMemo(() => copy[locale], [locale]);

  return (
    <main className="page split-page software-page" data-locale={locale}>
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

      <section className="software-hero reveal">
        <div className="software-hero-copy">
          <span className="tag">{t.badge}</span>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <div className="hero-actions">
            <a className="cta primary" href="#workflow">{t.heroActions.primary}</a>
            <a className="cta ghost" href="/docs#software">{t.heroActions.secondary}</a>
          </div>
          <div className="software-stats" aria-label="Software guardrails">
            {t.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="software-cockpit" aria-label="SiriusCeption software cockpit preview">
          <div className="cockpit-topbar">
            <span />
            <span />
            <span />
            <strong>{t.cockpit.title}</strong>
          </div>
          <p className="cockpit-subtitle">{t.cockpit.subtitle}</p>
          <div className="device-role-stack">
            {t.cockpit.devices.map((device) => (
              <div className="device-role" key={device.role}>
                <span className="role-dot" />
                <div>
                  <strong>{device.role}</strong>
                  <small>{device.hint}</small>
                </div>
                <code>{device.id}</code>
                <em>{device.state}</em>
              </div>
            ))}
          </div>
          <div className="cockpit-checks">
            {t.cockpit.checks.map((check) => <span key={check}>{check}</span>)}
          </div>
          <pre>{t.cockpit.command}</pre>
        </aside>
      </section>

      <section className="section split-content software-capabilities">
        <div className="cards reveal">
          {t.cards.map((card, index) => (
            <article className={`card ${index === 1 ? "highlight" : ""}`} key={card.title}>
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

      <section id="workflow" className="section software-workflow-section">
        <div className="section-title reveal">
          <span className="tag">Workflow</span>
          <h2>{t.workflowTitle}</h2>
          <p>{t.workflowLead}</p>
        </div>
        <div className="software-workflow reveal">
          {t.workflow.map((item) => (
            <article className="workflow-step" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section simulator-panel-section">
        <div className="simulator-panel reveal">
          <div>
            <span className="tag">Simulator</span>
            <h2>{t.simulator.title}</h2>
            <p>{t.simulator.lead}</p>
            <ul>
              {t.simulator.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
          <div className="robot-preview-card" aria-label="Robot simulator preview card">
            <div className="robot-preview-stage">
              <div className="robot-base" />
              <div className="robot-link link-a" />
              <div className="robot-link link-b" />
              <div className="robot-link link-c" />
              <div className="robot-joint joint-a" />
              <div className="robot-joint joint-b" />
              <div className="robot-joint joint-c" />
              <div className="robot-gripper" />
            </div>
            <div className="robot-preview-labels">
              {t.simulator.labels.map((label) => <span key={label}>{label}</span>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
