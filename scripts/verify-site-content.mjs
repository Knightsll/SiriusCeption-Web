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

const home = read('app/page.tsx');
const product = read('app/product/page.tsx');
const viewer = read('app/components/InteractiveDeviceModel.tsx');
const productPagePath = 'app/products/sirius-nova/page.tsx';
const productPageExists = existsSync(join(root, productPagePath));
const productPage = productPageExists ? read(productPagePath) : '';

check('home names Sirius Nova as the first product', home.includes('Sirius Nova') && home.includes('first product'), 'Home copy should anchor the site narrative around Sirius Nova.');
check('home links to Sirius Nova product page', home.includes('/products/sirius-nova'), 'Home nav or cards should link to the dedicated product page.');
check('generic product page links to Sirius Nova', product.includes('/products/sirius-nova') && product.includes('Sirius Nova'), 'Product overview should direct users to the first product.');
check('Sirius Nova route exists', productPageExists, `${productPagePath} should exist.`);
check('Sirius Nova page contains product specifics', productPage.includes('Sirius Nova') && productPage.includes('three-device') && productPage.includes('3D'), 'Dedicated page should describe the hardware, teleop workflow, and 3D view.');
check('mobile viewport is not forced to static-only', !viewer.includes('(max-width: 767px)') || viewer.includes('mobileCanLoad3d'), 'Interactive viewer should allow mobile 3D while keeping reduced-motion fallback.');
check('reduced motion still has static fallback', viewer.includes('prefers-reduced-motion: reduce') && viewer.includes('STATIC_RENDER'), 'Reduced-motion users should still get the static render fallback.');

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
