"use client";

import { useMemo } from "react";
import { useLocale } from "../useLocale";
import { SiteHeader } from "../components/SiteHeader";

const copy = {
  en: {
    back: "Back to Home",
    badge: "Product Docs",
    title: "SiriusCeption Data Acquisition System Guide",
    lead:
      "A practical guide for teams evaluating SiriusCeption as a hardware-based embodied-intelligence data acquisition platform for robot teleoperation, control demonstrations, and reusable training datasets.",
    quick: ["Developer Quick Start", "API Reference", "Product overview", "Hardware connection", "Node configuration", "Receiver monitor", "Pose validation", "Teleoperation data", "Robot dataset workflow"],
    developerTitle: "Developer Quick Start",
    developerLead: "Use these local endpoints after the SiriusCeption Client is running on the operator workstation.",
    developerCards: [
      ["API Reference", "GET /api/imu/devices", "List live IMU nodes, IDs, packet age, and receiver status before binding roles."],
      ["Pose data", "GET /api/visualizer/frame", "Read one calibrated pose frame for validation tools and diagnostics."],
      ["Robot command stream", "ws://127.0.0.1:8000/ws/robot/command", "Subscribe to low-latency command frames for simulator or robot-adapter handoff."],
      ["Polling fallback", "GET /api/robot/command", "Poll robot command state when WebSocket integration is not available."]
    ],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "What SiriusCeption is",
        lead:
          "SiriusCeption is a hardware-based embodied-intelligence data acquisition platform. Sirius Nova is the first hardware facility for capturing human motion, robot teleoperation demonstrations, full-body motion data, and reusable robot-control datasets.",
        items: [
          "Use human motion as a low-friction interface for robot teleoperation and data generation.",
          "Collect reusable motion demonstrations for embodied-intelligence training data.",
          "Start with single-arm or dual-arm robotic-arm teleoperation data capture, then extend toward managed sessions, labels, replay, export, and full-body humanoid workflows."
        ]
      },
      {
        id: "hardware",
        label: "02",
        title: "Hardware components",
        lead:
          "The current hardware project is an ESP32-C3 based wearable data collector node with firmware-side configuration storage, serial console commands, Wi-Fi networking, and UDP streaming.",
        items: [
          "Node ID: unique `id` / `slave_id` used by the receiver and visualizer.",
          "Network: Wi-Fi SSID/password stored in flash and editable over USB serial.",
          "Receiver target: `host` IP, `port`, and `udp_hz` streaming rate.",
          "Runtime commands: HELP, CONFIG on/off, SHOW, SET, SAVE, LOAD, RESET."
        ]
      },
      {
        id: "connect",
        label: "03",
        title: "Connection workflow",
        lead:
          "A standard user workflow should first configure each node over USB, then start the receiver on Ubuntu, then verify live orientation before using the data for robot control.",
        items: [
          "Connect one IMU node by USB and open the Node Config page.",
          "Set ID, Wi-Fi, Ubuntu receiver IP, UDP port, and stream rate.",
          "Save the configuration to flash, reboot the node, and confirm it joins the same network as the receiver.",
          "Start the Receiver Monitor and check packet rate, age, quaternion, gyro, and acceleration values."
        ]
      },
      {
        id: "software",
        label: "04",
        title: "Validation software",
        lead:
          "The SiriusCeption client is a validation and debugging tool for the hardware data-acquisition workflow. It helps users confirm device setup, signal quality, calibration, and motion mapping before production capture.",
        items: [
          "Node Config: USB serial setup for ID, Wi-Fi, receiver IP, UDP port, and streaming rate.",
          "Receiver Monitor: start/stop UDP receiver, inspect connected devices and live packet status.",
          "Pose Visualizer: select one device, calibrate, and inspect live orientation for signal-quality validation.",
          "Teleop Console: bind required role IDs and validate that mapped devices are online, synchronized, and calibrated before capturing teleoperation data.",
          "Robot model tools: inspect joint mapping, limits, and expected command/data shape so teams can validate the data pipeline before real deployment."
        ]
      },
      {
        id: "teleop",
        label: "05",
        title: "Teleop Console",
        lead:
          "The SiriusCeption client includes guided Teleop workflows for arm kits. It turns teleoperation parameters into a guided UI and blocks unsafe starts until all required devices are present.",
        items: [
          "Single-arm and dual-arm kits bind the required role IDs for each arm; the operator verifies mapped devices are online before starting capture.",
          "Open the Teleop page, bind the role IDs for the purchased kit, and confirm each role is online in the live role cards.",
          "Set upper/forearm segment lengths, `init_pose`, `earth_frame`, calibration duration, output rate, and optional `base_offset`.",
          "Click Apply Settings, Calibrate All while the operator holds still, then Start Teleop to inspect the live command-frame preview."
        ]
      },
      {
        id: "robot-control",
        label: "06",
        title: "Robot data workflow",
        lead:
          "Robot data workflow connects calibrated wearable motion to robot-model mapping, control-demonstration data, and dataset validation. The software views are support tools for checking that mapping before production capture or deployment.",
        items: [
          "Select Unitree Z1, SO-100/SO-101 style arm, Unitree G1, Custom 6DoF, Franka Panda, UR5e, or xArm6 from the model selector.",
          "Review joint names, limits, command format, and the expected dataset schema for downstream robot-control workflows.",
          "Robot-model viewers help teams inspect base frame, joint tree, limits, and expected motion mapping before collecting production data.",
          "Use the validation view to understand base frame, joint tree, expected command shape, and gripper/motion data before real deployment."
        ]
      },
      {
        id: "troubleshooting",
        label: "07",
        title: "Troubleshooting checklist",
        lead:
          "Most setup problems come from network mismatch, wrong receiver IP, closed UDP port, stale device data, or an uncalibrated coordinate frame.",
        items: [
          "No packets: verify Wi-Fi credentials, receiver IP, UDP port, and that the receiver is on the same LAN.",
          "Wrong device: confirm the role mapping uses the intended saved device IDs and that each changed configuration was saved.",
          "Pose looks wrong: re-run calibration, check sensor mounting direction, and verify `earth_frame`.",
          "Robot mapping offset: adjust segment lengths and `base_offset` before collecting production data."
        ]
      }
    ],
    configTitle: "Firmware configuration keys",
    configRows: [
      ["id / slave_id", "Unique IMU node ID"],
      ["ssid", "Wi-Fi network name"],
      ["pass", "Wi-Fi password"],
      ["host / host_ip", "Ubuntu receiver IP"],
      ["port / host_port", "UDP port, default 9999"],
      ["udp_hz / rate", "Stream rate, up to 100 Hz"],
      ["debug", "Debug mode, 0 or 1"]
    ],
    terminalTitle: "Serial console example",
    terminalLines: ["CONFIG on", "SHOW", "SET id 3", "SET ssid Sirius", "SET pass 88884444", "SET host 192.168.1.92", "SET port 9999", "SET udp_hz 100", "SAVE"],
    ctaTitle: "Recommended first-run flow",
    ctaLead: "Configure one node end-to-end first. After one node streams reliably, configure the remaining nodes in the purchased kit with saved device IDs, verify them in Receiver Monitor, open Teleop Console for role binding and calibration, then move to Robot Control for simulator model selection and URDF-based motion preview."
  },
  zh: {
    back: "返回首页",
    badge: "产品文档",
    title: "SiriusCeption 数据采集系统指南",
    lead:
      "面向评估 SiriusCeption 硬件化具身智能数据采集平台的团队，说明其如何支持机器人遥操作、控制示教和可复用训练数据集。",
    quick: ["开发者快速开始", "API Reference", "产品概览", "硬件连接", "节点配置", "接收端监控", "姿态验证", "遥操作数据", "机器人数据流程"],
    developerTitle: "开发者快速开始",
    developerLead: "SiriusCeption Client 在操作电脑启动后，可用以下本地接口接入验证工具、仿真器或机器人适配器。",
    developerCards: [
      ["API Reference", "GET /api/imu/devices", "查看在线 IMU 节点、设备 ID、包延迟和接收端状态，再进行角色绑定。"],
      ["姿态数据", "GET /api/visualizer/frame", "读取单设备标定后的姿态帧，用于验证工具和诊断。"],
      ["机器人命令流", "ws://127.0.0.1:8000/ws/robot/command", "订阅低延迟命令帧，交接给仿真器或机器人适配器。"],
      ["轮询备用", "GET /api/robot/command", "无法使用 WebSocket 集成时，轮询机器人命令状态。"]
    ],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "SiriusCeption 是什么",
        lead:
          "SiriusCeption 是硬件化的具身智能数据采集平台。Sirius Nova 是第一款硬件设施，用于采集人体动作、机器人遥操作示教、全身动作数据和可复用的机器人控制数据集。",
        items: [
          "把人体动作变成低门槛的机器人遥操作与数据生成接口。",
          "采集可复用的动作示教数据，用于具身智能训练。",
          "可先从单臂或双臂机械臂遥操作数据采集开始，再扩展到可管理的数据会话、标签、回放、导出和人形机器人全身流程。"
        ]
      },
      {
        id: "hardware",
        label: "02",
        title: "硬件组成",
        lead:
          "当前硬件项目是基于 ESP32-C3 的可穿戴数据采集节点，固件支持配置存储、串口命令、Wi-Fi 网络连接与 UDP 数据发送。",
        items: [
          "节点 ID：唯一的 `id` / `slave_id`，用于接收端和可视化页面识别设备。",
          "网络配置：Wi-Fi SSID/密码保存在 Flash 中，可通过 USB 串口修改。",
          "接收端目标：`host` IP、`port` 端口和 `udp_hz` 数据发送频率。",
          "运行命令：HELP、CONFIG on/off、SHOW、SET、SAVE、LOAD、RESET。"
        ]
      },
      {
        id: "connect",
        label: "03",
        title: "连接流程",
        lead:
          "标准使用流程是先通过 USB 配置每个节点，再启动 Ubuntu 接收端，最后在姿态可视化页面确认实时姿态，再进入机器人控制或数据采集。",
        items: [
          "用 USB 连接单个 IMU 节点，打开 Node Config 页面。",
          "设置 ID、Wi-Fi、Ubuntu 接收端 IP、UDP 端口和发送频率。",
          "保存配置到 Flash，重启节点，并确认它与接收端在同一网络。",
          "启动 Receiver Monitor，检查包频率、延迟、四元数、陀螺仪和加速度数据。"
        ]
      },
      {
        id: "software",
        label: "04",
        title: "验证软件说明",
        lead:
          "SiriusCeption 客户端是服务于硬件数据采集流程的验证和调试工具，帮助用户在正式采集前确认设备设置、信号质量、标定和动作映射。",
        items: [
          "Node Config：通过 USB 串口配置 ID、Wi-Fi、接收端 IP、UDP 端口和发送频率。",
          "Receiver Monitor：启动/停止 UDP 接收端，查看在线设备和实时数据包状态。",
          "Pose Visualizer：选择单个设备、执行校准、查看实时姿态，用于信号质量验证。",
          "Teleop Console：绑定所需角色 ID，并验证映射设备在线、同步且已标定后再采集遥操作数据。",
          "机器人模型工具：检查关节映射、限位和预期命令/数据形态，帮助团队在真实部署前验证数据链路。"
        ]
      },
      {
        id: "teleop",
        label: "05",
        title: "遥操作控制台",
        lead:
          "SiriusCeption 客户端包含面向手臂套装的 Teleop 引导流程。它把遥操作参数变成可操作 UI，并在必要设备未就绪时阻止启动。",
        items: [
          "单臂和双臂套装按每条手臂绑定所需角色 ID；操作者在启动采集前确认映射设备在线。",
          "打开 Teleop 页面，按购买套装绑定角色 ID，并在角色卡片中确认每个角色在线。",
          "设置上臂/前臂长度、`init_pose`、`earth_frame`、标定时长、输出频率以及可选 `base_offset`。",
          "点击 Apply Settings，操作者保持静止后执行 Calibrate All，然后 Start Teleop 查看实时 command-frame preview。"
        ]
      },
      {
        id: "robot-control",
        label: "06",
        title: "机器人数据流程",
        lead:
          "机器人数据流程把标定后的可穿戴动作连接到机器人模型映射、控制示教数据和数据集验证。软件视图是用于正式采集或部署前检查映射的支持工具。",
        items: [
          "可在模型选择器中选择 Unitree Z1、SO-100/SO-101、Unitree G1、Custom 6DoF、Franka Panda、UR5e 或 xArm6。",
          "检查关节名称、限位、命令格式和下游机器人控制工作流所需的数据结构。",
          "机器人模型视图帮助团队检查 base frame、joint tree、限位和预期动作映射，再进入正式数据采集。",
          "用户可以通过验证视图理解 base frame、joint tree、预期 command 形状和 gripper / motion 数据，再进入真实部署。"
        ]
      },
      {
        id: "troubleshooting",
        label: "07",
        title: "排查清单",
        lead:
          "大多数问题来自网络不一致、接收端 IP 错误、UDP 端口未打开、设备数据 stale 或坐标系未正确标定。",
        items: [
          "没有数据包：检查 Wi-Fi、接收端 IP、UDP 端口，以及设备是否在同一局域网。",
          "设备混乱：确认角色映射使用的是预期已保存设备 ID，并且修改配置后执行 SAVE。",
          "姿态方向异常：重新标定，检查传感器安装方向，并确认 `earth_frame`。",
          "机器人映射偏移：采集生产数据前先调整肢段长度和 `base_offset`。"
        ]
      }
    ],
    configTitle: "固件配置字段",
    configRows: [
      ["id / slave_id", "唯一 IMU 节点 ID"],
      ["ssid", "Wi-Fi 名称"],
      ["pass", "Wi-Fi 密码"],
      ["host / host_ip", "Ubuntu 接收端 IP"],
      ["port / host_port", "UDP 端口，默认 9999"],
      ["udp_hz / rate", "发送频率，最高 100 Hz"],
      ["debug", "调试模式，0 或 1"]
    ],
    terminalTitle: "串口命令示例",
    terminalLines: ["CONFIG on", "SHOW", "SET id 3", "SET ssid Sirius", "SET pass 88884444", "SET host 192.168.1.92", "SET port 9999", "SET udp_hz 100", "SAVE"],
    ctaTitle: "推荐首次使用流程",
    ctaLead: "先完整配置并跑通一个节点。确认单节点稳定发送后，再为购买套装中的其他节点配置并保存设备 ID，在 Receiver Monitor 中验证节点均在线，进入 Teleop Console 绑定角色并标定，最后进入 Robot Control 选择 simulator 机器人模型并查看基于 URDF 的动作预览。"
  }
} as const;

export default function DocsPage() {
  const [locale, setLocale] = useLocale();
  const t = useMemo(() => copy[locale], [locale]);

  return (
    <main className="page docs-page" data-locale={locale}>
      <div className="bg-ambient" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="orb orb-c" aria-hidden="true" />

      <SiteHeader locale={locale} setLocale={setLocale} />

      <section className="section docs-hero">
        <div className="docs-hero-copy reveal">
          <span className="tag">{t.badge}</span>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <div className="docs-pills">
            {t.quick.map((item, index) => {
              const href = index < 2 ? "#developer-quick-start" : `#${t.sections[index - 2]?.id ?? "overview"}`;
              return <a href={href} key={item}>{item}</a>;
            })}
          </div>
        </div>
        <aside className="docs-terminal reveal delay-1" aria-label={t.terminalTitle}>
          <div className="terminal-bar">
            <span />
            <span />
            <span />
          </div>
          <h2>{t.terminalTitle}</h2>
          <pre>{t.terminalLines.map((line) => `> ${line}`).join("\n")}</pre>
        </aside>
      </section>

      <section className="section developer-quick-start" id="developer-quick-start">
        <div className="section-title">
          <h2>{t.developerTitle}</h2>
          <p>{t.developerLead}</p>
        </div>
        <div className="cards reveal">
          {t.developerCards.map(([title, endpoint, body]) => (
            <article className="card" key={endpoint}>
              <span className="tag">{title}</span>
              <code>{endpoint}</code>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section docs-layout">
        <aside className="docs-toc">
          {t.sections.map((section) => (
            <a href={`#${section.id}`} key={section.id}>
              <span>{section.label}</span>
              {section.title}
            </a>
          ))}
        </aside>
        <div className="docs-content">
          {t.sections.map((section) => (
            <article className="docs-card" id={section.id} key={section.id}>
              <span className="step-index">{section.label}</span>
              <h2>{section.title}</h2>
              <p>{section.lead}</p>
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}

          <article className="docs-card config-card">
            <span className="step-index">API</span>
            <h2>{t.configTitle}</h2>
            <div className="config-grid">
              {t.configRows.map(([key, value]) => (
                <div className="config-row" key={key}>
                  <code>{key}</code>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="docs-callout">
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaLead}</p>
            <div className="hero-actions">
              <a className="cta primary" href="/#software">
                {locale === "en" ? "View software workflow" : "查看软件流程"}
              </a>
              <a className="cta ghost" href="/videos">
                {locale === "en" ? "Watch demos" : "观看演示视频"}
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
