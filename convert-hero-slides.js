/**
 * Convert hero slide images to WebP
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const heroImages = [
  {
    input: 'public/img/slides-hero/atikah-akhtar-gzfIO69Q6eM-unsplash.jpg',
    output: 'public/assets/hero-slide-1.webp',
  },
  {
    input: 'public/img/slides-hero/karelys-ruiz-PqyzuzFiQfY-unsplash.jpg',
    output: 'public/assets/hero-slide-2.webp',
  },
  {
    input: 'public/img/slides-hero/rosa-rafael-Pe9IXUuC6QU-unsplash.jpg',
    output: 'public/assets/hero-slide-3.webp',
  },
];

async function convertHeroSlides() {
  console.log('🎬 Converting hero slides to WebP...\n');

  for (const config of heroImages) {
    try {
      const inputPath = path.join(__dirname, config.input);
      const outputPath = path.join(__dirname, config.output);

      await sharp(inputPath)
        .resize(1920, 1080, {
          fit: 'cover',
          position: 'center'
        })
        .webp({
          quality: 90, // Higher quality for hero images
          effort: 6
        })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`✅ ${path.basename(config.output)} - ${sizeKB} KB`);

    } catch (error) {
      console.error(`❌ Error converting ${config.input}:`, error.message);
    }
  }

  console.log('\n✨ Hero slides ready!');
}

convertHeroSlides().catch(console.error);
