/**
 * Image Optimization Script
 *
 * Optimizes all images in /public folder:
 * - Converts to WebP (50-80% smaller)
 * - Compresses quality to 85%
 * - Generates responsive sizes
 *
 * Usage:
 * node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png)$/i;

// Configuration
const CONFIG = {
  quality: 85,
  webpQuality: 85,
  maxWidth: 2000,
  generateResponsive: true,
  responsiveSizes: [400, 800, 1200, 1920],
};

async function optimizeImage(filePath) {
  const filename = path.basename(filePath);
  const dir = path.dirname(filePath);
  const nameWithoutExt = filename.replace(IMAGE_EXTENSIONS, '');

  console.log(`\n🔄 Optimizing: ${filePath}`);

  try {
    const metadata = await sharp(filePath).metadata();
    const originalSize = fs.statSync(filePath).size;

    // 1. Convert to WebP
    const webpPath = path.join(dir, `${nameWithoutExt}.webp`);
    await sharp(filePath)
      .webp({ quality: CONFIG.webpQuality })
      .toFile(webpPath);

    const webpSize = fs.statSync(webpPath).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`  ✅ WebP: ${formatBytes(originalSize)} → ${formatBytes(webpSize)} (${savings}% smaller)`);

    // 2. Generate responsive sizes
    if (CONFIG.generateResponsive && metadata.width > 800) {
      const responsiveDir = path.join(dir, 'responsive');
      if (!fs.existsSync(responsiveDir)) {
        fs.mkdirSync(responsiveDir, { recursive: true });
      }

      for (const size of CONFIG.responsiveSizes) {
        if (size < metadata.width) {
          const responsivePath = path.join(
            responsiveDir,
            `${nameWithoutExt}-${size}w.webp`
          );

          await sharp(filePath)
            .resize(size)
            .webp({ quality: CONFIG.webpQuality })
            .toFile(responsivePath);

          const responsiveSize = fs.statSync(responsivePath).size;
          console.log(`  📏 ${size}w: ${formatBytes(responsiveSize)}`);
        }
      }
    }

    return {
      original: originalSize,
      webp: webpSize,
      savings: parseFloat(savings),
    };
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return null;
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  const results = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'responsive') {
      // Recursively process subdirectories
      const subResults = await processDirectory(filePath);
      results.push(...subResults);
    } else if (IMAGE_EXTENSIONS.test(file)) {
      const result = await optimizeImage(filePath);
      if (result) results.push(result);
    }
  }

  return results;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📁 Directory: ${PUBLIC_DIR}\n`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('❌ /public directory not found!');
    process.exit(1);
  }

  const startTime = Date.now();
  const results = await processDirectory(PUBLIC_DIR);
  const endTime = Date.now();

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(50));

  const totalOriginal = results.reduce((sum, r) => sum + r.original, 0);
  const totalWebp = results.reduce((sum, r) => sum + r.webp, 0);
  const totalSavings = ((1 - totalWebp / totalOriginal) * 100).toFixed(1);

  console.log(`\n✅ Optimized ${results.length} images`);
  console.log(`📦 Original size: ${formatBytes(totalOriginal)}`);
  console.log(`📦 Optimized size: ${formatBytes(totalWebp)}`);
  console.log(`💾 Total savings: ${formatBytes(totalOriginal - totalWebp)} (${totalSavings}%)`);
  console.log(`⏱️  Time: ${((endTime - startTime) / 1000).toFixed(1)}s`);

  console.log('\n💡 Next steps:');
  console.log('  1. Review optimized images');
  console.log('  2. Delete original .jpg/.png if satisfied');
  console.log('  3. Update image references to .webp');
  console.log('  4. Commit to git');
}

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.error('❌ sharp is not installed!');
  console.error('📦 Install it with: npm install sharp');
  process.exit(1);
}

main().catch(console.error);
