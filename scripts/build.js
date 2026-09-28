// Campus Connect - Production Build & Verification Script
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('⚡ Starting Campus Connect build verification...\n');

let hasErrors = false;

// 1. Verify and copy data files for static fallback
const rootDataDir = path.join(__dirname, '..', 'data');
const publicDataDir = path.join(__dirname, '..', 'public', 'data');

if (!fs.existsSync(publicDataDir)) {
  fs.mkdirSync(publicDataDir, { recursive: true });
}

['clubs.json', 'users.json'].forEach(fileName => {
  const src = path.join(rootDataDir, fileName);
  const dest = path.join(publicDataDir, fileName);

  try {
    const raw = fs.readFileSync(src, 'utf8');
    const parsed = JSON.parse(raw);
    const count = Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length;
    console.log(`  ✔ Validated ${fileName} (${count} records)`);
    // Copy to public/data for offline / static fallback
    fs.writeFileSync(dest, raw, 'utf8');
  } catch (err) {
    console.error(`  ❌ Error in ${fileName}:`, err.message);
    hasErrors = true;
  }
});

// 2. Syntax check all JS files
const filesToCheck = [
  'server.js',
  'public/js/app.js',
  'public/js/store.js',
  'public/js/api.js',
  'public/js/components/navbar.js',
  'public/js/components/heroCarousel.js',
  'public/js/components/clubDirectory.js',
  'public/js/components/clubProfile.js',
  'public/js/components/presidentDashboard.js',
  'public/js/components/authModal.js',
  'public/js/components/clubCard.js',
  'public/js/components/postModal.js',
  'public/js/components/deadlineTimeline.js',
  'public/js/utils/countdown.js',
  'public/js/utils/helpers.js'
];

let checkedCount = 0;
filesToCheck.forEach(relPath => {
  const fullPath = path.join(__dirname, '..', relPath);
  if (fs.existsSync(fullPath)) {
    try {
      execSync(`node --check "${fullPath}"`, { stdio: 'pipe' });
      checkedCount++;
    } catch (err) {
      console.error(`  ❌ Syntax error in ${relPath}:`, err.message);
      hasErrors = true;
    }
  }
});

console.log(`  ✔ Syntax validated for ${checkedCount} JavaScript files`);

// 3. Verify static entry points
const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
const cssPath = path.join(__dirname, '..', 'public', 'css', 'style.css');

if (fs.existsSync(htmlPath) && fs.existsSync(cssPath)) {
  console.log(`  ✔ Core assets present (index.html, style.css)`);
} else {
  console.error(`  ❌ Missing public/index.html or public/css/style.css`);
  hasErrors = true;
}

if (hasErrors) {
  console.error('\n❌ Build verification failed! Fix errors above.');
  process.exit(1);
} else {
  console.log('\n✨ Build clean! Ready for Vercel and production deployment.\n');
  process.exit(0);
}
