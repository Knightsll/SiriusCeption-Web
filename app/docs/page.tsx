"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "zh";

const copy = {
  en: {
    back: "Back to Home",
    badge: "Product Docs",
    title: "SiriusCeption Product & Software Guide",
    lead:
      "A practical product documentation page for teams evaluating, installing, configuring, and operating the SiriusCeption IMU motion-capture system.",
    quick: ["Product overview", "Hardware connection", "Node configuration", "Receiver monitor", "Pose visualization", "Teleoperation SDK"],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "What SiriusCeption is",
        lead:
          "SiriusCeption is a wearable IMU motion-capture device for robot teleoperation and embodied-AI data collection. Each node streams orientation and motion data over Wi-Fi/UDP to an Ubuntu receiver, where the software monitors devices, visualizes pose, and exposes data for robot-control pipelines.",
        items: [
          "Use human motion as a low-friction control interface for robots and simulation.",
          "Collect reusable motion demonstrations for embodied-intelligence training data.",
          "Start with arm-only teleoperation, then extend to full-body capture workflows."
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
          "Pose Visualizer: select devices, calibrate, and inspect live orientation for teleoperation debugging."
        ]
      },
      {
        id: "teleop",
        label: "05",
        title: "Teleoperation SDK",
        lead:
          "The Python teleoperation layer turns UDP IMU data into a three-segment arm pose. It supports calibration poses, coordinate-frame selection, segment lengths, and robot-base offsets.",
        items: [
          "Teleop requires exactly three IMU devices: upper arm, forearm, and hand, each with a unique saved node ID.",
          "Use the Teleop Console on the home page to bind the three IDs, set segment lengths, and generate the `teleop_3joint_visualizer.py` launch command.",
          "Choose `init_pose`: down, forward, or left; choose `earth_frame`: SEU/BNO08X, ENU, NED, or NWU.",
          "Run calibration while the operator holds still, then read positions and hand rotation for downstream robot control."
        ]
      },
      {
        id: "troubleshooting",
        label: "06",
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
    ctaLead: "Configure one node end-to-end first. After one node streams reliably, repeat IDs for the remaining body segments and validate them in Receiver Monitor before calibrating the Pose Visualizer."
  },
  zh: {
    back: "返回首页",
    badge: "产品文档",
    title: "SiriusCeption 产品与软件使用指南",
    lead:
      "面向评估、安装、配置和使用 SiriusCeption IMU 动作捕捉系统的文档页，集中说明产品信息、连接方式、节点配置、接收端监控与遥操作数据链路。",
    quick: ["产品概览", "硬件连接", "节点配置", "接收端监控", "姿态可视化", "遥操作 SDK"],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "SiriusCeption 是什么",
        lead:
          "SiriusCeption 是用于机器人遥操作与具身智能数据采集的可穿戴 IMU 动作捕捉设备。每个节点通过 Wi-Fi/UDP 将姿态与运动数据发送到 Ubuntu 接收端，软件端负责设备监控、姿态可视化，并为机器人控制管线提供数据。",
        items: [
          "把人体动作变成低门槛的机器人与仿真控制接口。",
          "采集可复用的动作示教数据，用于具身智能训练。",
          "可先从手臂遥操作开始，再扩展到全身姿态采集流程。"
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
          "Pose Visualizer：选择设备、执行校准、查看实时姿态，用于遥操作调试。"
        ]
      },
      {
        id: "teleop",
        label: "05",
        title: "遥操作 SDK",
        lead:
          "Python 遥操作层把 UDP IMU 数据转换成三段手臂位姿，支持标定姿态、坐标系选择、肢段长度和机器人底座偏移。",
        items: [
          "遥操作必须使用三个 IMU 设备：上臂、前臂、手部，并且每个设备都需要唯一且已保存的节点 ID。",
          "在首页 Teleop Console 中绑定三个 ID，设置肢段长度，并生成 `teleop_3joint_visualizer.py` 启动命令。",
          "选择 `init_pose`：down、forward 或 left；选择 `earth_frame`：SEU/BNO08X、ENU、NED 或 NWU。",
          "操作者保持静止完成标定，然后读取 positions 与 hand_R 供下游机器人控制使用。"
        ]
      },
      {
        id: "troubleshooting",
        label: "06",
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
    ctaLead: "先完整配置并跑通一个节点。确认单节点稳定发送后，再为其他身体节点分配 ID，并在 Receiver Monitor 中验证所有节点，最后进入 Pose Visualizer 标定。"
  }
} as const;

export default function DocsPage() {
  const [locale, setLocale] = useState<Locale>("zh");
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
