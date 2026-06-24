"use client";

import { useMemo, useState } from "react";
import { InteractiveDeviceModel } from "../components/InteractiveDeviceModel";
import { SiteHeader } from "../components/SiteHeader";
import { useLocale } from "../useLocale";

const copy = {
  en: {
    back: "Home",
    badge: "Product catalog",
    title: "SiriusCeption products",
    lead:
      "Explore the SiriusCeption product catalog. Sirius Nova is the current product line, with orderable kits for robotic-arm teleoperation, full-body humanoid workflows, and embodied-intelligence data acquisition.",
    selectorLabel: "Select product",
    comingSoon: "More SiriusCeption products will be added here as the hardware/data-acquisition system expands.",
    productCta: "View Sirius Nova detail",
    buyCta: "Contact to order",
    quoteCta: "Request deployment plan",
    demosTitle: "Product demos",
    demosLead:
      "See Sirius Nova in purchasable deployment modes: single-arm and dual-arm robotic teleoperation, plus full-body humanoid motion capture and teleoperation.",
    videosCta: "View full video library",
    products: [
      {
        id: "sirius-nova",
        name: "Sirius Nova",
        status: "Current product",
        href: "/products/sirius-nova",
        label: "Embodied-AI data collector",
        summary:
          "A wearable embodied-AI data collector node for motion data acquisition, sold as single-arm, dual-arm, and full-body kits with matched pose, calibration, and robot-teleoperation software. The public workflow covers USB-C configuration, Wi-Fi UDP streaming, local calibration, and HTTP/WebSocket handoff.",
        priceLead: "From",
        price: "€599",
        priceNote: "per single-arm kit",
        packageTitle: "Available packages",
        packages: [
          {
            title: "Single-arm kit",
            price: "€599 / set",
            body:
              "For one robotic arm or mechanical arm. Includes single-arm pose tracking and single-arm robotic-arm teleoperation software."
          },
          {
            title: "Dual-arm kit",
            price: "€1,199 / kit",
            body:
              "For two-arm robotic teleoperation and bimanual data capture. Includes dual-arm pose tracking and dual-arm robotic-arm teleoperation software."
          },
          {
            title: "Full-body humanoid kit",
            price: "€2,999 / kit",
            body:
              "For humanoid robots. Includes full-body pose tracking and humanoid robot teleoperation software."
          }
        ],
        specsTitle: "Product specifications",
        specs: [
          ["Product type", "Wearable wireless embodied-AI data collector node"],
          ["Dimensions", "Compact wearable enclosure; source model bounds approx. 39 × 65 × 24 mm"],
          ["Streaming frequency", "Configurable UDP stream rate up to 100 Hz; 50 Hz is recommended on unstable Wi-Fi"],
          ["Motion output", "Live quaternion orientation, gyroscope, and acceleration data per node, with receiver diagnostics for data rate, packet age, battery, and magnetometer status"],
          ["Precision workflow", "Calibration-backed orientation tracking; packet rate, packet age, and signal quality are validated before capture"],
          ["Connectivity", "ESP32-C3 wireless node with Wi-Fi UDP streaming and USB-C serial configuration"],
          ["Device configuration", "Operator sets id, ssid, password, host LAN IP, port 9999, udp_hz, and debug from the SiriusCeption Client"],
          ["Node identity", "Each physical node stores a saved ID for receiver binding, role assignment, and multi-node capture"],
          ["Local interfaces", "Client exposes /api/imu/devices, /api/visualizer/frame, /api/teleop/frame, /api/robot/command, and ws://127.0.0.1:8000/ws/robot/command"],
          ["Supported systems", "Released client packages cover Ubuntu and Windows"],
          ["Single-arm kit", "Single-arm pose tracking + single-arm robotic-arm teleoperation software · €599 / set"],
          ["Dual-arm kit", "Dual-arm pose tracking + dual-arm robotic-arm teleoperation software · €1,199 / kit"],
          ["Full-body kit", "Full-body pose tracking + humanoid robot teleoperation software · €2,999 / kit"],
          ["Software", "Package-matched pose tracking, teleoperation, validation, calibration, and motion-mapping tools"]
        ],
        demos: [
          {
            mode: "Robotic-arm teleoperation",
            title: "PiPER Arm Teleoperation",
            url: "https://www.youtube.com/embed/z-4OFV3XAUA",
            body: "Shows the single-arm kit as a practical robotic-arm teleoperation and data-capture workflow."
          },
          {
            mode: "Robotic-arm teleoperation",
            title: "ABB Yumi Teleoperation",
            url: "https://www.youtube.com/embed/Q75OV8lVS-o",
            body: "A second arm platform example that supports the same mechanical-arm teleoperation positioning."
          },
          {
            mode: "Full-body motion capture",
            title: "Full-body Pose Tracking",
            url: "https://www.youtube.com/embed/IEHnCtcOQJ8",
            body: "Evidence for the full-body kit for humanoid-robot pose tracking and teleoperation data."
          }
        ]
      }
    ]
  },
  zh: {
    back: "首页",
    badge: "产品目录",
    title: "SiriusCeption 产品",
    lead:
      "浏览 SiriusCeption 产品目录。Sirius Nova 是当前产品线，提供面向机械臂遥操作、全身人形机器人流程和具身智能数据采集的可购买套装。",
    selectorLabel: "选择产品",
    comingSoon: "后续 SiriusCeption 的更多产品会随着硬件与数据采集系统扩展继续添加在这里。",
    productCta: "查看 Sirius Nova 详情",
    buyCta: "联系购买",
    quoteCta: "获取部署方案",
    demosTitle: "产品演示",
    demosLead: "查看 Sirius Nova 的可购买交付形态：单臂、双臂机械臂遥操作，以及人形机器人全身动作捕捉与遥操作。",
    videosCta: "查看完整视频库",
    products: [
      {
        id: "sirius-nova",
        name: "Sirius Nova",
        status: "当前产品",
        href: "/products/sirius-nova",
        label: "具身智能数据采集节点",
        summary:
          "Sirius Nova 是面向具身智能数据采集的可穿戴数据采集节点，可按单臂、双臂和全身套装交付，并配套对应的位姿、标定和机器人遥操作软件。公开工作流覆盖 USB-C 配置、Wi-Fi UDP 数据发送、本地标定以及 HTTP/WebSocket 数据交接。",
        priceLead: "起售价",
        price: "€599",
        priceNote: "每套单臂套装",
        packageTitle: "可购买套装",
        packages: [
          {
            title: "单臂套装",
            price: "€599 / 套",
            body:
              "面向单个机械臂 / 机器人手臂。包括单臂位姿与单臂机械臂遥操作软件。"
          },
          {
            title: "双臂套装",
            price: "€1,199 / 套",
            body:
              "面向双机械臂遥操作和双臂数据采集。包括双臂位姿与双臂机械臂遥操作软件。"
          },
          {
            title: "全身人形机器人套装",
            price: "€2,999 / 套",
            body:
              "面向人形机器人。包括全身位姿与人形机器人遥操作软件。"
          }
        ],
        specsTitle: "产品性能与规格",
        specs: [
          ["产品类型", "可穿戴具身智能数据采集节点"],
          ["尺寸", "紧凑型可穿戴外壳；源模型边界约 39 × 65 × 24 mm"],
          ["数据频率", "UDP 发送频率最高可配置到 100 Hz；Wi-Fi 不稳定时建议从 50 Hz 开始"],
          ["动作数据", "每个节点实时输出四元数姿态、陀螺仪和加速度数据，并在接收端查看数据率、包延迟、电池与磁力计状态诊断"],
          ["精度工作流", "通过标定支撑姿态跟踪；采集前验证包频率、包延迟与信号质量"],
          ["连接方式", "ESP32-C3 无线节点，支持 Wi-Fi UDP 数据流与 USB-C 串口配置"],
          ["设备配置", "用户在 SiriusCeption Client 中设置 id、ssid、password、电脑 LAN IP、9999 端口、udp_hz 与 debug"],
          ["节点识别", "每个物理节点保存 node ID，用于接收端绑定、角色分配和多节点采集"],
          ["本地接口", "Client 提供 /api/imu/devices、/api/visualizer/frame、/api/teleop/frame、/api/robot/command 和 ws://127.0.0.1:8000/ws/robot/command"],
          ["支持系统", "发布版客户端覆盖 Ubuntu 与 Windows"],
          ["单臂套装", "单臂位姿 + 单臂机械臂遥操作软件 · €599 / 套"],
          ["双臂套装", "双臂位姿 + 双臂机械臂遥操作软件 · €1,199 / 套"],
          ["全身套装", "全身位姿 + 人形机器人遥操作软件 · €2,999 / 套"],
          ["软件", "按套装配套位姿、遥操作、设备设置、标定和动作映射验证工具"]
        ],
        demos: [
          {
            mode: "机械臂遥操作",
            title: "PiPER 机械臂遥操作",
            url: "https://www.youtube.com/embed/z-4OFV3XAUA",
            body: "展示单臂套装在机械臂遥操作与机器人控制数据采集中的实际工作流。"
          },
          {
            mode: "机械臂遥操作",
            title: "ABB Yumi 机械臂遥操作",
            url: "https://www.youtube.com/embed/Q75OV8lVS-o",
            body: "用第二种机械臂平台补充说明同一套机械臂遥操作定位。"
          },
          {
            mode: "全身动作捕捉",
            title: "全身姿态跟踪",
            url: "https://www.youtube.com/embed/IEHnCtcOQJ8",
            body: "作为全身套装面向人形机器人全身位姿与遥操作数据的演示证据。"
          }
        ]
      }
    ]
  }
} as const;

export default function ProductPage() {
  const [locale, setLocale] = useLocale();
  const t = useMemo(() => copy[locale], [locale]);
  const [selectedProductId, setSelectedProductId] = useState<(typeof t.products)[number]["id"]>(t.products[0].id);
  const selectedProduct = t.products.find((product) => product.id === selectedProductId) ?? t.products[0];

  return (
    <main className="page split-page" data-locale={locale}>
      <div className="bg-ambient" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <SiteHeader locale={locale} setLocale={setLocale} />

      <section className="split-hero product-hero reveal">
        <span className="tag">{t.badge}</span>
        <h1>{t.title}</h1>
        <p>{t.lead}</p>
      </section>

      <section className="section product-catalog">
        <div className="product-selector reveal">
          <label htmlFor="product-select">{t.selectorLabel}</label>
          <select id="product-select" value={selectedProductId} onChange={(event) => setSelectedProductId(event.target.value as typeof selectedProductId)}>
            {t.products.map((product) => (
              <option value={product.id} key={product.id}>{product.name}</option>
            ))}
          </select>
          <span>{selectedProduct.status}</span>
        </div>

        <article className="product-buy-panel reveal delay-1">
          <div className="product-buy-visual">
            <span className="product-badge">{selectedProduct.label}</span>
            <InteractiveDeviceModel locale={locale} />
          </div>

          <div className="product-buy-info">
            <p className="eyebrow">{selectedProduct.status}</p>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.summary}</p>

            <div className="product-price-box">
              <span>{selectedProduct.priceLead}</span>
              <strong>{selectedProduct.price}</strong>
              <small>{selectedProduct.priceNote}</small>
            </div>

            <div className="product-actions">
              <a className="cta primary" href="mailto:SiriusCeption@outlook.com">{t.buyCta}</a>
              <a className="cta ghost" href={selectedProduct.href}>{t.productCta}</a>
            </div>
          </div>
        </article>

        <div className="product-commerce-grid reveal delay-2">
          <article className="card product-offering-card">
            <span className="step-index">01</span>
            <h3>{selectedProduct.packageTitle}</h3>
            <div className="product-offerings">
              {selectedProduct.packages.map((pkg) => (
                <div className="product-offering" key={pkg.title}>
                  <div>
                    <h4>{pkg.title}</h4>
                    <p>{pkg.body}</p>
                  </div>
                  <strong>{pkg.price}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="card product-spec-card">
            <span className="step-index">02</span>
            <h3>{selectedProduct.specsTitle}</h3>
            <div className="config-grid product-spec-list">
              {selectedProduct.specs.map(([label, value]) => (
                <div className="config-row" key={label}>
                  <code>{label}</code>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <a className="software-doc-link cta ghost" href="mailto:SiriusCeption@outlook.com">{t.quoteCta}</a>
          </article>
        </div>

        <section className="product-demo-section reveal delay-2">
          <div className="section-title product-demo-title">
            <p className="eyebrow">{selectedProduct.name}</p>
            <h2>{t.demosTitle}</h2>
            <p>{t.demosLead}</p>
          </div>
          <div className="product-demo-grid">
            {selectedProduct.demos.map((demo) => (
              <article className="media-card product-demo-card" key={demo.title}>
                <div className="media-embed">
                  <iframe
                    src={demo.url}
                    title={demo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="product-demo-meta">
                  <span>{demo.mode}</span>
                  <h3>{demo.title}</h3>
                  <p>{demo.body}</p>
                </div>
              </article>
            ))}
          </div>
          <a className="software-doc-link cta ghost" href="/videos">{t.videosCta}</a>
        </section>

        <p className="product-coming-soon reveal delay-2">{t.comingSoon}</p>
      </section>
    </main>
  );
}
