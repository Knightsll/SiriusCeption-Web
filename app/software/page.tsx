"use client";

import { useMemo } from "react";
import { useLocale } from "../useLocale";
import { SiteHeader } from "../components/SiteHeader";

const copy = {
  en: {
    back: "Home",
    badge: "Software",
    title: "Validation software for the data acquisition platform",
    lead:
      "SiriusCeption software is an operator tool for device validation, signal checking, calibration, and motion-mapping debugging. It supports the hardware data-acquisition platform; it is not the final product structure by itself.",
    cards: [
      {
        title: "Device setup & signal quality",
        body: "Guide users through USB-C device configuration, Wi-Fi UDP receiver setup, and live diagnostics before production capture starts.",
        points: ["id / ssid / host / port", "0.0.0.0:9999 receiver", "Rate / age / battery diagnostics"]
      },
      {
        title: "Role mapping for capture",
        body: "For single-arm and dual-arm kits, users explicitly map Sirius Nova device IDs to the required arm/control roles before teleoperation.",
        points: ["Single/dual-arm roles", "Role readiness", "Capture readiness"]
      },
      {
        title: "Calibration & validation",
        body: "The UI helps users verify single-device pose, arm motion preview, and full-body calibration quality before collecting embodied-intelligence data.",
        points: ["Set Forward calibration", "Motion quality check", "Full-body validation"]
      },
      {
        title: "Robot-model inspection",
        body: "HTTP and WebSocket handoff views help teams validate command shape, robot model selection, limits, and data readiness before real deployment.",
        points: ["/api/robot/command", "WebSocket stream", "Dataset readiness"]
      }
    ]
  },
  zh: {
    back: "首页",
    badge: "软件",
    title: "面向数据采集平台的验证软件",
    lead:
      "SiriusCeption 软件是给用户做设备验证、信号检查、标定和动作映射调试的操作工具。它服务于硬件数据采集平台，本身不是产品的最终结构。",
    cards: [
      {
        title: "设备接入与信号质量",
        body: "在正式采集前，引导用户完成 USB-C 设备配置、Wi-Fi UDP 接收端设置和实时诊断。",
        points: ["id / ssid / host / port", "0.0.0.0:9999 接收端", "频率 / 延迟 / 电池诊断"]
      },
      {
        title: "采集角色映射",
        body: "针对单臂和双臂套装，用户把 Sirius Nova 设备 ID 明确映射到所需手臂 / 控制角色，再进入遥操作。",
        points: ["单臂 / 双臂角色", "角色就绪", "采集就绪"]
      },
      {
        title: "标定与验证",
        body: "UI 帮助用户在采集具身智能数据前验证单设备姿态、手臂动作预览或全身标定质量。",
        points: ["Set Forward 标定", "动作质量检查", "全身验证"]
      },
      {
        title: "机器人模型检查",
        body: "HTTP 与 WebSocket 交接视图帮助团队在真实部署前验证命令形态、机器人模型选择、限位和数据就绪情况。",
        points: ["/api/robot/command", "WebSocket 数据流", "数据集就绪"]
      }
    ]
  }
} as const;

export default function SplitPage() {
  const [locale, setLocale] = useLocale();
  const t = useMemo(() => copy[locale], [locale]);
  return (
    <main className="page split-page" data-locale={locale}>
      <div className="bg-ambient" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <SiteHeader locale={locale} setLocale={setLocale} />

      <section className="split-hero reveal">
        <span className="tag">{t.badge}</span>
        <h1>{t.title}</h1>
        <p>{t.lead}</p>
      </section>

      <section className="section split-content">
        <div className="cards reveal">
          {t.cards.map((card, index) => (
            <article className={`card ${index === 0 ? "highlight" : ""}`} key={card.title}>
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
    </main>
  );
}
