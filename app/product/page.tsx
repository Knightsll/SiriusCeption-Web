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
    products: [
      {
        id: "sirius-nova",
        name: "Sirius Nova",
        status: "Current product",
        href: "/products/sirius-nova",
        label: "Wearable IMU node",
        summary:
          "A wearable IMU node for embodied-intelligence data acquisition, sold as configured sets for robotic-arm teleoperation data and humanoid full-body motion capture.",
        priceLead: "From",
        price: "€1,000",
        priceNote: "per robotic-arm teleoperation set",
        packageTitle: "Available packages",
        packages: [
          {
            title: "Robotic-arm teleoperation set",
            price: "€1,000 / set",
            body:
              "For mechanical-arm / robotic-arm teleoperation data capture and robot-control demonstrations. Presented as a Sirius Nova arm-teleoperation set, not as a temporary test-device count."
          },
          {
            title: "Full-body motion-capture set",
            price: "€3,000 / set",
            body:
              "For humanoid-robot full-body motion capture. The full-body configuration uses 17 Sirius Nova nodes."
          }
        ],
        specsTitle: "Specifications",
        specs: [
          ["Product type", "Wearable wireless IMU node"],
          ["Platform role", "Hardware layer for embodied data acquisition"],
          ["Arm package", "Robotic-arm teleoperation data capture · €1,000 / set"],
          ["Full-body package", "17-node humanoid motion-capture set · €3,000 / set"],
          ["Software", "Validation/debugging for setup, signal quality, calibration, and motion mapping"],
          ["Product detail", "Dedicated 3D inspection page for Sirius Nova"]
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
    products: [
      {
        id: "sirius-nova",
        name: "Sirius Nova",
        status: "当前产品",
        href: "/products/sirius-nova",
        label: "可穿戴 IMU 节点",
        summary:
          "Sirius Nova 是面向具身智能数据采集的可穿戴 IMU 节点，可按机械臂遥操作数据套装或人形机器人全身动作捕捉套装交付。",
        priceLead: "起售价",
        price: "€1,000",
        priceNote: "每套机械臂遥操作套装",
        packageTitle: "可购买套装",
        packages: [
          {
            title: "机械臂遥操作套装",
            price: "€1,000 / 套",
            body:
              "面向机械臂 / 机器人手臂的遥操作数据采集与机器人控制示教。页面呈现为 Sirius Nova 的机械臂遥操作套装，不把测试用设备数量写成产品身份。"
          },
          {
            title: "全身动作捕捉套装",
            price: "€3,000 / 套",
            body:
              "面向人形机器人的全身动作捕捉。全身配置使用 17 个 Sirius Nova 节点。"
          }
        ],
        specsTitle: "规格参数",
        specs: [
          ["产品类型", "可穿戴无线 IMU 节点"],
          ["平台角色", "具身智能数据采集的硬件层"],
          ["机械臂套装", "机械臂遥操作数据采集 · €1,000 / 套"],
          ["全身套装", "17 节点人形机器人动作捕捉套装 · €3,000 / 套"],
          ["软件", "用于设备设置、信号质量、标定和动作映射验证的调试工具"],
          ["产品详情", "Sirius Nova 独立 3D 产品检查页"]
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
              <a className="cta primary" href="mailto:hello@siriusception.ai">{t.buyCta}</a>
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
            <a className="software-doc-link cta ghost" href="mailto:hello@siriusception.ai">{t.quoteCta}</a>
          </article>
        </div>

        <p className="product-coming-soon reveal delay-2">{t.comingSoon}</p>
      </section>
    </main>
  );
}
