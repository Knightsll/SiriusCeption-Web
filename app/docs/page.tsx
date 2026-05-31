"use client";

import { useMemo } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: {
    back: "Back to Home",
    badge: "Product Docs",
    title: "SiriusCeption Data Acquisition System Guide",
    lead:
      "A practical guide for teams evaluating the current SiriusCeption IMU hardware product and the software path toward a one-stop embodied-intelligence data acquisition system.",
    quick: ["Product overview", "Hardware connection", "Node configuration", "Receiver monitor", "Pose visualization", "Teleop Console", "Robot Control"],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "What SiriusCeption is",
        lead:
          "SiriusCeption is currently a wearable IMU hardware product for robot teleoperation and embodied-AI data collection. The product direction is a one-stop data acquisition system where hardware, receiver software, teleop, validation, labeling, replay, and export work as one workflow.",
        items: [
          "Use human motion as a low-friction control interface for robots and simulation.",
          "Collect reusable motion demonstrations for embodied-intelligence training data.",
          "Start with hardware-based arm teleoperation, then extend toward managed data sessions, labels, replay, and full-body workflows."
        ]
      },
      {
        id: "hardware",
        label: "02",
        title: "Hardware components",
        lead:
          "The current hardware project is an ESP32-C3 based wearable IMU node with firmware-side configuration storage, serial console commands, Wi-Fi networking, and UDP streaming.",
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
        title: "Software pages",
        lead:
          "The SiriusCeption client separates hardware setup, receiver status, and motion debugging into focused pages so operators can find the right tool quickly.",
        items: [
          "Node Config: USB serial setup for ID, Wi-Fi, receiver IP, UDP port, and streaming rate.",
          "Receiver Monitor: start/stop UDP receiver, inspect connected devices and live packet status.",
          "Pose Visualizer: select one device, calibrate, and inspect live orientation for debugging.",
          "Teleop Console: bind upper arm, forearm, and hand IDs; the page requires three unique online devices before calibration and start.",
          "Robot Control: select Unitree Z1 or another robot profile, inspect joint mapping and limits, and verify the real URDF viewer with the robot base fixed at the world origin."
        ]
      },
      {
        id: "teleop",
        label: "05",
        title: "Teleop Console",
        lead:
          "The SiriusCeption client now has a dedicated Teleop page for a three-IMU arm workflow. It turns the Python teleoperation parameters into a guided UI and blocks unsafe starts until all required devices are present.",
        items: [
          "Teleop requires exactly three IMU devices: upper arm, forearm, and hand, each with a unique saved node ID.",
          "Open the Teleop page, bind the three role IDs, and confirm each role is online in the live role cards.",
          "Set upper/forearm segment lengths, `init_pose`, `earth_frame`, calibration duration, output rate, and optional `base_offset`.",
          "Click Apply Settings, Calibrate All while the operator holds still, then Start Teleop to inspect the live command-frame preview."
        ]
      },
      {
        id: "robot-control",
        label: "06",
        title: "Robot Control",
        lead:
          "Robot Control is the robot-specific stage after three-IMU calibration: select the target robot, inspect joint mapping, and use a safe preview before any real output is armed.",
        items: [
          "Select Unitree Z1, SO-100/SO-101 style arm, Unitree G1, Custom 6DoF, Franka Panda, UR5e, or xArm6 from the model selector.",
          "Review joint names, limits, command format, and keep the Operator gate separate from Enable output.",
          "The real URDF viewer renders Unitree Z1 meshes with the robot base fixed at the world origin instead of centering the whole bounding box.",
          "Use the viewer to confirm base frame, joint tree, and command-preview shape before connecting any robot SDK/CAN/serial transport."
        ]
      },
      {
        id: "troubleshooting",
        label: "07",
        title: "Troubleshooting checklist",
        lead:
          "Most setup problems come from network mismatch, duplicate node IDs, wrong receiver IP, closed UDP port, or an uncalibrated coordinate frame.",
        items: [
          "No packets: verify Wi-Fi credentials, receiver IP, UDP port, and that the receiver is on the same LAN.",
          "Wrong device: confirm each physical node has a unique ID and was saved after configuration.",
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
      ["udp_hz / rate", "Stream rate, 1–500 Hz"],
      ["debug", "Debug mode, 0 or 1"]
    ],
    terminalTitle: "Serial console example",
    terminalLines: ["CONFIG on", "SHOW", "SET id 3", "SET ssid Sirius", "SET pass 88884444", "SET host 192.168.1.92", "SET port 9999", "SET udp_hz 100", "SAVE"],
    ctaTitle: "Recommended first-run flow",
    ctaLead: "Configure one node end-to-end first. After one node streams reliably, repeat unique IDs for the remaining arm nodes, verify all three in Receiver Monitor, open Teleop Console for role binding and calibration, then move to Robot Control for model selection and URDF-based command preview."
  },
  zh: {
    back: "返回首页",
    badge: "产品文档",
    title: "SiriusCeption 数据采集系统指南",
    lead:
      "面向评估当前 SiriusCeption IMU 硬件产品以及未来一站式具身智能数据采集系统的软件路线，集中说明连接、配置、监控、遥操作与数据链路。",
    quick: ["产品概览", "硬件连接", "节点配置", "接收端监控", "姿态可视化", "遥操作控制台", "机器人控制"],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "SiriusCeption 是什么",
        lead:
          "SiriusCeption 当前是用于机器人遥操作与具身智能数据采集的可穿戴 IMU 硬件产品。长期方向是一站式数据采集系统，让硬件、接收端软件、遥操作、质量验证、标注、回放和导出形成一个完整流程。",
        items: [
          "把人体动作变成低门槛的机器人与仿真控制接口。",
          "采集可复用的动作示教数据，用于具身智能训练。",
          "可先从硬件驱动的手臂遥操作开始，再扩展到可管理的数据会话、标签、回放和全身采集流程。"
        ]
      },
      {
        id: "hardware",
        label: "02",
        title: "硬件组成",
        lead:
          "当前硬件项目是基于 ESP32-C3 的可穿戴 IMU 节点，固件支持配置存储、串口命令、Wi-Fi 网络连接与 UDP 数据发送。",
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
        title: "软件页面说明",
        lead:
          "SiriusCeption 客户端把硬件设置、接收端状态和动作调试拆成独立页面，让用户快速找到对应工具。",
        items: [
          "Node Config：通过 USB 串口配置 ID、Wi-Fi、接收端 IP、UDP 端口和发送频率。",
          "Receiver Monitor：启动/停止 UDP 接收端，查看在线设备和实时数据包状态。",
          "Pose Visualizer：选择单个设备、执行校准、查看实时姿态，用于调试。",
          "Teleop Console：绑定上臂、前臂、手部 ID；必须三个唯一设备都在线后才能标定和启动。",
          "Robot Control：选择 Unitree Z1 或其他机器人模型，检查关节映射和限位，并确认真实 URDF 视图中机器人底座固定在世界原点。"
        ]
      },
      {
        id: "teleop",
        label: "05",
        title: "遥操作控制台",
        lead:
          "SiriusCeption 客户端已经加入独立 Teleop 页面，用于三 IMU 手臂遥操作流程。它把 Python 遥操作参数变成可操作 UI，并在必要设备未就绪时阻止启动。",
        items: [
          "遥操作必须使用三个 IMU 设备：上臂、前臂、手部，并且每个设备都需要唯一且已保存的节点 ID。",
          "打开 Teleop 页面，绑定三个角色 ID，并在角色卡片中确认每个角色在线。",
          "设置上臂/前臂长度、`init_pose`、`earth_frame`、标定时长、输出频率以及可选 `base_offset`。",
          "点击 Apply Settings，操作者保持静止后执行 Calibrate All，然后 Start Teleop 查看实时 command-frame preview。"
        ]
      },
      {
        id: "robot-control",
        label: "06",
        title: "机器人控制",
        lead:
          "Robot Control 是三 IMU 标定之后的机器人专用阶段：选择目标机器人、检查关节映射，并在任何真实输出使能前使用安全预览。",
        items: [
          "可在模型选择器中选择 Unitree Z1、SO-100/SO-101、Unitree G1、Custom 6DoF、Franka Panda、UR5e 或 xArm6。",
          "检查关节名称、限位、命令格式，并保持 Operator gate 与 Enable output 分离。",
          "真实 URDF 视图会渲染 Unitree Z1 mesh，并让机器人底座固定在世界原点，而不是把整个 bounding box 居中。",
          "连接任何机器人 SDK/CAN/串口传输前，先用该视图确认 base frame、joint tree 和 command preview 形状。"
        ]
      },
      {
        id: "troubleshooting",
        label: "07",
        title: "排查清单",
        lead:
          "大多数问题来自网络不一致、节点 ID 重复、接收端 IP 错误、UDP 端口未打开或坐标系未正确标定。",
        items: [
          "没有数据包：检查 Wi-Fi、接收端 IP、UDP 端口，以及设备是否在同一局域网。",
          "设备混乱：确认每个物理节点都有唯一 ID，并且配置后执行 SAVE。",
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
      ["udp_hz / rate", "发送频率，1–500 Hz"],
      ["debug", "调试模式，0 或 1"]
    ],
    terminalTitle: "串口命令示例",
    terminalLines: ["CONFIG on", "SHOW", "SET id 3", "SET ssid Sirius", "SET pass 88884444", "SET host 192.168.1.92", "SET port 9999", "SET udp_hz 100", "SAVE"],
    ctaTitle: "推荐首次使用流程",
    ctaLead: "先完整配置并跑通一个节点。确认单节点稳定发送后，再为其他手臂节点分配唯一 ID，在 Receiver Monitor 中验证三个节点均在线，进入 Teleop Console 绑定角色并标定，最后进入 Robot Control 选择机器人模型并查看基于 URDF 的命令预览。"
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

      <header className="nav">
        <div className="brand">
          <span className="brand-mark">SC</span>
          <span className="brand-name">SiriusCeption</span>
        </div>
        <div className="nav-actions">
          <div className="lang-select">
            <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label="Language">
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <a className="cta ghost" href="/">
            {t.back}
          </a>
        </div>
      </header>

      <section className="section docs-hero">
        <div className="docs-hero-copy reveal">
          <span className="tag">{t.badge}</span>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <div className="docs-pills">
            {t.quick.map((item, index) => (
              <a href={`#${t.sections[index]?.id ?? "overview"}`} key={item}>{item}</a>
            ))}
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
