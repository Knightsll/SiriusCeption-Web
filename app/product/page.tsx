"use client";

import { useMemo, useState } from "react";
import { InteractiveDeviceModel } from "../components/InteractiveDeviceModel";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: {
    back: "Home",
    badge: "Product catalog",
    title: "SiriusCeption products",
    lead:
      "Product remains a top-level catalog because Sirius Nova is only the first product in the SiriusCeption system. Choose a product below; future product lines can be added without changing the structure.",
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
          "A wearable embodied-AI data collector node for motion data acquisition, sold as single-arm, dual-arm, and full-body kits with matched pose and robot-teleoperation software.",
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
          ["Streaming frequency", "Configurable UDP stream rate from 1–500 Hz; 100 Hz recommended for first-run validation"],
          ["Motion output", "Live quaternion orientation, gyroscope, and acceleration data per node"],
          ["Precision workflow", "Calibration-backed orientation tracking; packet rate, packet age, and signal quality are validated before capture"],
          ["Connectivity", "ESP32-C3 wireless node with Wi-Fi UDP streaming and USB-C serial configuration"],
          ["Node identity", "Each node stores a unique ID for receiver binding, role assignment, and multi-node capture"],
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
      "Product 需要保留为一级产品目录，因为 Sirius Nova 只是 SiriusCeption 系统中的第一个产品。下面通过下拉框选择当前产品，也为后续新增更多产品线保留结构。",
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
          "Sirius Nova 是面向具身智能数据采集的可穿戴数据采集节点，可按单臂、双臂和全身套装交付，并配套对应的位姿与机器人遥操作软件。",
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
          ["数据频率", "UDP 发送频率可配置为 1–500 Hz；首次部署验证建议从 100 Hz 开始"],
          ["动作数据", "每个节点实时输出四元数姿态、陀螺仪和加速度数据"],
          ["精度工作流", "通过标定支撑姿态跟踪；采集前验证包频率、包延迟与信号质量"],
          ["连接方式", "ESP32-C3 无线节点，支持 Wi-Fi UDP 数据流与 USB-C 串口配置"],
          ["节点识别", "每个节点保存唯一 ID，用于接收端绑定、角色分配和多节点采集"],
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
