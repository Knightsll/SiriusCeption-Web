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
  const [teleopIds, setTeleopIds] = useState({ upper: "1", fore: "2", hand: "3" });
  const [teleopLengths, setTeleopLengths] = useState({ upper: "0.30", fore: "0.25" });
  const [teleopPose, setTeleopPose] = useState("forward");
  const t = useMemo(() => copy[locale], [locale]);

  const assignedTeleopIds = Object.values(teleopIds).map((id) => id.trim()).filter(Boolean);
  const hasThreeTeleopDevices = assignedTeleopIds.length === 3;
  const duplicateTeleopIds = assignedTeleopIds.filter((id, index) => assignedTeleopIds.indexOf(id) !== index);
  const hasUniqueTeleopDevices = new Set(assignedTeleopIds).size === assignedTeleopIds.length;
  const teleopReady = hasThreeTeleopDevices && hasUniqueTeleopDevices;
  const teleopBlockReason = !hasThreeTeleopDevices
    ? (locale === "en" ? "Needs 3 devices" : "需要 3 个设备")
    : !hasUniqueTeleopDevices
      ? (locale === "en" ? "Fix duplicate IDs" : "修正重复 ID")
      : (locale === "en" ? "Ready to calibrate" : "可进入标定");
  const teleopRoles = [
    { key: "upper", labelEn: "Upper arm", labelZh: "上臂", id: teleopIds.upper, body: locale === "en" ? "Shoulder → elbow segment" : "肩部 → 肘部骨段" },
    { key: "fore", labelEn: "Forearm", labelZh: "前臂", id: teleopIds.fore, body: locale === "en" ? "Elbow → wrist segment" : "肘部 → 腕部骨段" },
    { key: "hand", labelEn: "Hand", labelZh: "手部", id: teleopIds.hand, body: locale === "en" ? "Wrist / hand orientation" : "腕部 / 手部朝向" }
  ];
  const teleopCommand = `python teleop_3joint_visualizer.py --upper-id ${teleopIds.upper || "<upper>"} --fore-id ${teleopIds.fore || "<fore>"} --hand-id ${teleopIds.hand || "<hand>"} --l-upper ${teleopLengths.upper || "0.30"} --l-fore ${teleopLengths.fore || "0.25"} --init-pose ${teleopPose} --earth-frame SEU --port 9999`;

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
          <h2>{locale === "en" ? "Client Workflow" : "客户端使用流程"}</h2>
          <p>{locale === "en" ? "Four focused pages: configure nodes, monitor UDP receiver data, visualize one-node pose, then run the three-device Teleop Console." : "四个页面分工明确：节点配置、接收端监控、单设备姿态可视化，以及三设备遥操作控制台。"}</p>
        </div>
        <div className="software-steps reveal">
          <article className="step-card">
            <span className="step-index">01</span>
            <h3>{locale === "en" ? "Node Config" : "节点配置"}</h3>
            <p>{locale === "en" ? "USB serial setup for ID, Wi-Fi, receiver IP, UDP port, and stream rate." : "通过 USB 串口设置 ID、Wi-Fi、接收端 IP、UDP 端口与发送频率。"}</p>
          </article>
          <article className="step-card">
            <span className="step-index">02</span>
            <h3>{locale === "en" ? "Receiver Monitor" : "接收端监控"}</h3>
            <p>{locale === "en" ? "Start UDP, view devices, packet rate, age, quaternion, gyro, and accel." : "启动 UDP，查看设备、包频率、延迟、四元数、陀螺仪与加速度。"}</p>
          </article>
          <article className="step-card">
            <span className="step-index">03</span>
            <h3>{locale === "en" ? "Pose Visualizer" : "姿态可视化"}</h3>
            <p>{locale === "en" ? "Select device, calibrate, and inspect live orientation for teleoperation debugging." : "选择设备、校准，并查看实时姿态，用于遥操作调试。"}</p>
          </article>
          <article className="step-card highlight-step">
            <span className="step-index">04</span>
            <h3>{locale === "en" ? "Teleop Console" : "遥操作控制台"}</h3>
            <p>{locale === "en" ? "Bind three live IMU nodes to upper arm, forearm, and hand, calibrate them together, then start teleop frame preview." : "绑定上臂、前臂、手部三个在线 IMU 节点，统一标定后启动遥操作帧预览。"}</p>
          </article>
        </div>

        <div className="teleop-panel reveal delay-1">
          <div className="teleop-copy">
            <span className="tag">{locale === "en" ? "3-device teleop" : "三设备遥操作"}</span>
            <h3>{locale === "en" ? "Teleop is now a software page, not just a script" : "遥操作现在是软件页面，不只是脚本"}</h3>
            <p>
              {locale === "en"
                ? "The client has a dedicated Teleop page. It requires exactly three unique online SiriusCeption nodes before calibration: upper arm, forearm, and hand. The page blocks start until all three roles are live."
                : "客户端已经加入独立 Teleop 页面。进入标定前必须有三个唯一且在线的 SiriusCeption 节点：上臂、前臂、手部；任一角色缺失或 ID 重复都会阻止启动。"}
            </p>
            <div className="teleop-status" data-ready={teleopReady}>
              <strong>{teleopBlockReason}</strong>
              <span>{assignedTeleopIds.length}/3 {locale === "en" ? "assigned" : "已绑定"}</span>
            </div>
            <div className="teleop-role-list" aria-label={locale === "en" ? "Required teleop device roles" : "遥操作必需设备角色"}>
              {teleopRoles.map((role) => {
                const roleId = role.id.trim();
                const duplicate = roleId !== "" && duplicateTeleopIds.includes(roleId);
                const valid = roleId !== "" && !duplicate;
                return (
                  <div className="teleop-role-card" data-valid={valid} key={role.key}>
                    <span className="role-dot" />
                    <div>
                      <strong>{locale === "en" ? role.labelEn : role.labelZh}</strong>
                      <p>{role.body}</p>
                    </div>
                    <em>{roleId ? `ID ${roleId}` : (locale === "en" ? "Unassigned" : "未绑定")}</em>
                    {duplicate && <small>{locale === "en" ? "Duplicate ID" : "ID 重复"}</small>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="teleop-config">
            <div className="teleop-device-grid">
              <label>
                <span>{locale === "en" ? "Upper arm ID" : "上臂设备 ID"}</span>
                <input value={teleopIds.upper} onChange={(event) => setTeleopIds({ ...teleopIds, upper: event.target.value })} inputMode="numeric" />
              </label>
              <label>
                <span>{locale === "en" ? "Forearm ID" : "前臂设备 ID"}</span>
                <input value={teleopIds.fore} onChange={(event) => setTeleopIds({ ...teleopIds, fore: event.target.value })} inputMode="numeric" />
              </label>
              <label>
                <span>{locale === "en" ? "Hand ID" : "手部设备 ID"}</span>
                <input value={teleopIds.hand} onChange={(event) => setTeleopIds({ ...teleopIds, hand: event.target.value })} inputMode="numeric" />
              </label>
            </div>

            <div className="teleop-options">
              <label>
                <span>{locale === "en" ? "Upper length (m)" : "上臂长度 (m)"}</span>
                <input value={teleopLengths.upper} onChange={(event) => setTeleopLengths({ ...teleopLengths, upper: event.target.value })} inputMode="decimal" />
              </label>
              <label>
                <span>{locale === "en" ? "Forearm length (m)" : "前臂长度 (m)"}</span>
                <input value={teleopLengths.fore} onChange={(event) => setTeleopLengths({ ...teleopLengths, fore: event.target.value })} inputMode="decimal" />
              </label>
              <label>
                <span>{locale === "en" ? "Calibration pose" : "标定姿态"}</span>
                <select value={teleopPose} onChange={(event) => setTeleopPose(event.target.value)}>
                  <option value="forward">forward</option>
                  <option value="down">down</option>
                  <option value="left">left</option>
                </select>
              </label>
            </div>

            <div className="teleop-command">
              <span>{locale === "en" ? "Launch command" : "启动命令"}</span>
              <code>{teleopCommand}</code>
            </div>

            <div className="teleop-preview" data-ready={teleopReady}>
              <div className="teleop-preview-head">
                <span>{locale === "en" ? "Page interaction flow" : "页面交互流程"}</span>
                <strong>{teleopReady ? (locale === "en" ? "3 devices mapped" : "3 个设备已映射") : teleopBlockReason}</strong>
              </div>
              <div className="arm-preview" aria-hidden="true">
                <span className="joint shoulder" />
                <span className="joint elbow" />
                <span className="joint hand" />
                <span className="link upper" />
                <span className="link fore" />
                <b className="label shoulder-label">{locale === "en" ? "upper" : "上臂"}</b>
                <b className="label elbow-label">{locale === "en" ? "fore" : "前臂"}</b>
                <b className="label hand-label">{locale === "en" ? "hand" : "手部"}</b>
              </div>
              <ol>
                <li>{locale === "en" ? "Bind upper / forearm / hand IDs" : "绑定上臂 / 前臂 / 手部 ID"}</li>
                <li>{locale === "en" ? "Verify three unique live nodes in Receiver Monitor" : "在接收端监控确认三个唯一在线节点"}</li>
                <li>{locale === "en" ? "Calibrate all three together, then start teleop preview" : "三设备同步标定后启动遥操作预览"}</li>
              </ol>
            </div>

            <div className="teleop-actions">
              <button className="cta primary small" disabled={!teleopReady} type="button">
                {teleopReady ? (locale === "en" ? "Start Teleop Preview" : "启动遥操作预览") : teleopBlockReason}
              </button>
              <a className="cta ghost small" href="/docs#teleop">
                {locale === "en" ? "Open Teleop guide" : "打开遥操作指南"}
              </a>
              <a className="cta ghost small" href="/software/teleop_3joint_visualizer.py" download>
                {locale === "en" ? "Download Python script" : "下载 Python 脚本"}
              </a>
            </div>
          </div>
        </div>
        <a className="cta ghost software-doc-link" href="/docs">
          {locale === "en" ? "Read product docs" : "查看产品文档"}
        </a>
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
