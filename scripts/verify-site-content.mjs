import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const checks = [];

function check(name, condition, detail) {
  checks.push({ name, condition: Boolean(condition), detail });
}

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

const pagePaths = [
  'app/page.tsx',
  'app/product/page.tsx',
  'app/products/sirius-nova/page.tsx',
  'app/applications/page.tsx',
  'app/software/page.tsx',
  'app/docs/page.tsx',
  'app/videos/page.tsx',
  'app/blog/page.tsx',
];
const pages = Object.fromEntries(pagePaths.map((path) => [path, existsSync(join(root, path)) ? read(path) : '']));
const home = pages['app/page.tsx'];
const product = pages['app/product/page.tsx'];
const applications = pages['app/applications/page.tsx'];
const software = pages['app/software/page.tsx'];
const docs = pages['app/docs/page.tsx'];
const videos = pages['app/videos/page.tsx'];
const blog = pages['app/blog/page.tsx'];
const viewer = read('app/components/InteractiveDeviceModel.tsx');
const siteHeader = read('app/components/SiteHeader.tsx');
const productPagePath = 'app/products/sirius-nova/page.tsx';
const productPageExists = existsSync(join(root, productPagePath));
const productPage = pages[productPagePath] ?? '';

check('home names Sirius Nova as the first product', home.includes('Sirius Nova') && home.includes('first product'), 'Home copy should anchor the site narrative around Sirius Nova.');
check('home links to Sirius Nova product page', home.includes('/products/sirius-nova'), 'Home nav or cards should link to the dedicated product page.');
check('generic product page links to Sirius Nova', product.includes('/products/sirius-nova') && product.includes('Sirius Nova'), 'Product overview should direct users to the first product.');
check('Sirius Nova route exists', productPageExists, `${productPagePath} should exist.`);
check('Sirius Nova page contains product specifics', productPage.includes('Sirius Nova') && productPage.includes('robotic-arm') && productPage.includes('Full-body') && productPage.includes('3D'), 'Dedicated page should describe the hardware, arm teleoperation set, full-body motion-capture set, and 3D view.');
check('public manual interfaces are surfaced', productPage.includes('/api/imu/devices') && productPage.includes('/api/teleop/frame') && productPage.includes('/ws/robot/command') && product.includes('Ubuntu and Windows'), 'Product pages should expose the public local API/WebSocket handoff and supported end-user systems.');
check('stale 17-node positioning is absent', !product.includes('17-node') && !productPage.includes('17-node'), 'Public product copy should not describe full-body kit with stale exact node counts.');
check('mobile viewport is not forced to static-only', !viewer.includes('(max-width: 767px)') || viewer.includes('mobileCanLoad3d'), 'Interactive viewer should allow mobile 3D while keeping reduced-motion fallback.');
check('reduced motion still has static fallback', viewer.includes('prefers-reduced-motion: reduce') && viewer.includes('STATIC_RENDER'), 'Reduced-motion users should still get the static render fallback.');

const publicPages = [home, product, productPage, applications, software, docs, videos, blog];
const pagesUseSharedHeader = publicPages.every((page) => page.includes('<SiteHeader locale={locale} setLocale={setLocale} />'));
const sharedHeaderHasDocs = siteHeader.includes('/docs') && siteHeader.includes('Developer Docs') && siteHeader.includes('开发者文档');
const sharedHeaderHasDemoCta = siteHeader.includes('Book a Demo') && siteHeader.includes('预约演示') && siteHeader.includes('mailto:SiriusCeption@outlook.com');
check(
  'every public page offers one-step Developer Docs access',
  pagesUseSharedHeader && sharedHeaderHasDocs,
  'Every top-level page and product page should expose a direct Developer Docs link so engineers never need to return home first.'
);
check(
  'every non-docs page has a conversion CTA',
  [home, product, productPage, applications, software, videos, blog].every((page) => page.includes('<SiteHeader locale={locale} setLocale={setLocale} />')) && sharedHeaderHasDemoCta,
  'Marketing/product pages should keep Book a Demo or Request Quote reachable.'
);
check(
  'docs page has developer quick-start and API reference paths',
  docs.includes('Developer Quick Start') && docs.includes('API Reference') && docs.includes('/api/imu/devices') && docs.includes('/ws/robot/command'),
  'Docs should open with developer-oriented quick paths and public API/WebSocket reference points.'
);

const failed = checks.filter((item) => !item.condition);
for (const item of checks) {
  console.log(`${item.condition ? '✓' : '✗'} ${item.name}`);
  if (!item.condition) console.log(`  ${item.detail}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} content check(s) failed.`);
  process.exit(1);
}

console.log('\nAll content checks passed.');
