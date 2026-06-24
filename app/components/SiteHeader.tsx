"use client";

import type { Locale } from "../useLocale";

const labels = {
  en: {
    product: "Products",
    applications: "Applications",
    software: "Software",
    docs: "Developer Docs",
    videos: "Videos",
    blog: "Blog",
    demo: "Book a Demo"
  },
  zh: {
    product: "产品",
    applications: "应用",
    software: "软件",
    docs: "开发者文档",
    videos: "视频",
    blog: "Blog",
    demo: "预约演示"
  }
} as const;

type SiteHeaderProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  ctaHref?: string;
};

export function SiteHeader({ locale, setLocale, ctaHref = "mailto:SiriusCeption@outlook.com" }: SiteHeaderProps) {
  const t = labels[locale];

  return (
    <header className="nav">
      <a className="brand" href="/" aria-label="SiriusCeption home">
        <span className="brand-mark">SC</span>
        <span className="brand-name">SiriusCeption</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="/product">{t.product}</a>
        <a href="/applications">{t.applications}</a>
        <a href="/software">{t.software}</a>
        <a href="/docs">{t.docs}</a>
        <a href="/videos">{t.videos}</a>
        <a href="/blog">{t.blog}</a>
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
        <a className="cta primary nav-cta" href={ctaHref}>{t.demo}</a>
      </div>
    </header>
  );
}
