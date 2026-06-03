"use client";

import { useMemo, useState } from "react";
import { useLocale, type Locale } from "../useLocale";

const copy = {
  en: {
    back: "Home",
    badge: "Product system",
    title: "SiriusCeption products",
    lead:
      "Product remains a top-level page because Sirius Nova is only the first product in the SiriusCeption system. Use the selector to browse the current product and leave room for future product lines.",
    selectorLabel: "Select product",
    comingSoon: "More SiriusCeption products will be added here as the system expands.",
    products: [
      {
        id: "sirius-nova",
        name: "Sirius Nova",
        status: "Current product",
        href: "/products/sirius-nova",
        summary:
          "A wearable IMU node and hardware facility for embodied-intelligence data acquisition, available as configured sets for robotic-arm teleoperation data and full-body motion capture.",
        specsTitle: "Sirius Nova specs",
        specs: [
          ["Device type", "Wearable wireless IMU node"],
          ["Primary use", "Motion capture hardware layer"],
          ["Sensor workflow", "Real-time orientation / motion data for receiver software"],
          ["Preview", "3D product inspection on the Sirius Nova page"],
          ["Software context", "Validation and debugging tools for device setup, signal quality, and motion mapping"]
        ],
        offeringsTitle: "Configured sets",
        offerings: [
          {
            title: "Robotic-arm teleoperation set",
            body:
              "For robotic-arm teleoperation data capture and robot-control demonstrations. This is presented as a Sirius Nova set configured for robot-arm data acquisition.",
            price: "€1,000 / set"
          },
          {
            title: "Full-body motion-capture set",
            body:
              "For humanoid-robot full-body motion capture. The full-body configuration uses 17 Sirius Nova nodes.",
            price: "€3,000 / set"
          }
        ]
      }
    ]
  },
  zh: {
    back: "首页",
    badge: "产品系统",
    title: "SiriusCeption 产品",
    lead:
      "Product 需要保留为一级页面，因为 Sirius Nova 只是 SiriusCeption 系统中的第一个产品。这里通过下拉框选择当前产品，也为后续新增更多产品留出结构。",
    selectorLabel: "选择产品",
    comingSoon: "后续 SiriusCeption 的更多产品会继续添加在这里。",
    products: [
      {
        id: "sirius-nova",
        name: "Sirius Nova",
        status: "当前产品",
        href: "/products/sirius-nova",
        summary:
          "Sirius Nova 是面向具身智能数据采集的可穿戴 IMU 节点与硬件设施，可按机械臂遥操作数据套装或全身动作捕捉套装交付。",
        specsTitle: "Sirius Nova 规格",
        specs: [
          ["设备类型", "可穿戴无线 IMU 节点"],
          ["核心用途", "动作捕捉硬件层"],
          ["传感工作流", "面向接收端软件的实时姿态 / 动作数据"],
          ["产品预览", "在 Sirius Nova 页面查看 3D 产品模型"],
          ["软件语境", "用于设备设置、信号质量和动作映射验证的调试工具"]
        ],
        offeringsTitle: "套装与价格",
        offerings: [
          {
            title: "机械臂遥操作套装",
            body:
              "面向机械臂遥操作数据采集与机器人控制示教。页面上应作为 Sirius Nova 的机械臂应用套装呈现，不把设备数量写成一个独立产品。",
            price: "€1,000 / 套"
          },
          {
            title: "全身动作捕捉套装",
            body:
              "面向人形机器人的全身动作捕捉。全身配置使用 17 个 Sirius Nova 节点。",
            price: "€3,000 / 套"
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

      <section className="split-hero reveal">
        <span className="tag">{t.badge}</span>
        <h1>{t.title}</h1>
        <p>{t.lead}</p>
      </section>

      <section className="section split-content product-catalog">
        <div className="product-selector reveal">
          <label htmlFor="product-select">{t.selectorLabel}</label>
          <select id="product-select" value={selectedProductId} onChange={(event) => setSelectedProductId(event.target.value as typeof selectedProductId)}>
            {t.products.map((product) => (
              <option value={product.id} key={product.id}>{product.name}</option>
            ))}
          </select>
          <span>{selectedProduct.status}</span>
        </div>

        <article className="card highlight product-intro-card reveal delay-1">
          <span className="step-index">01</span>
          <h3>{selectedProduct.name}</h3>
          <p>{selectedProduct.summary}</p>
          <a className="software-doc-link cta ghost" href={selectedProduct.href}>Sirius Nova</a>
        </article>

        <div className="product-detail-grid reveal delay-2">
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
          </article>

          <article className="card product-offering-card">
            <span className="step-index">03</span>
            <h3>{selectedProduct.offeringsTitle}</h3>
            <div className="product-offerings">
              {selectedProduct.offerings.map((offering) => (
                <div className="product-offering" key={offering.title}>
                  <div>
                    <h4>{offering.title}</h4>
                    <p>{offering.body}</p>
                  </div>
                  <strong>{offering.price}</strong>
                </div>
              ))}
            </div>
          </article>
        </div>

        <p className="product-coming-soon reveal delay-2">{t.comingSoon}</p>
      </section>
    </main>
  );
}
