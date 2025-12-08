/**
 * Image Conversion Script
 * Converts images to WebP format and optimizes them for web
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Ensure assets directory exists
const assetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Image mapping and conversion configuration
const conversions = [
  // Hero images - use the first one as hero background
  {
    input: 'public/img/slides-hero/atikah-akhtar-gzfIO69Q6eM-unsplash.jpg',
    output: 'public/assets/hero-placeholder.webp',
    width: 1920,
    height: 1080,
    quality: 85
  },

  // Grid section images
  {
    input: 'public/img/grid-section/Rejuvie-Dental-Bali-Patient-1-1920x1920.jpg',
    output: 'public/assets/promo-person.webp',
    width: 600,
    height: 800,
    quality: 85
  },
  {
    input: 'public/img/grid-section/result-treatment-1-1024x1024.jpg',
    output: 'public/assets/doctor-beforeafter.webp',
    width: 800,
    height: 400,
    quality: 85
  },
  {
    input: 'public/img/grid-section/antri-wrinkle-injection1.jpg',
    output: 'public/assets/facility.webp',
    width: 800,
    height: 400,
    quality: 85
  },

  // Service images - use remaining hero images
  {
    input: 'public/img/slides-hero/karelys-ruiz-PqyzuzFiQfY-unsplash.jpg',
    output: 'public/assets/service-1.webp',
    width: 1200,
    height: 800,
    quality: 80
  },
  {
    input: 'public/img/slides-hero/rosa-rafael-Pe9IXUuC6QU-unsplash.jpg',
    output: 'public/assets/service-2.webp',
    width: 1200,
    height: 800,
    quality: 80
  },
  {
    input: 'public/img/grid-section/antri-wrinkle-injection1.jpg',
    output: 'public/assets/service-3.webp',
    width: 1200,
    height: 800,
    quality: 80
  },
  {
    input: 'public/img/grid-section/result-treatment-1-1024x1024.jpg',
    output: 'public/assets/service-4.webp',
    width: 1200,
    height: 800,
    quality: 80
  },
  {
    input: 'public/img/slides-hero/atikah-akhtar-gzfIO69Q6eM-unsplash.jpg',
    output: 'public/assets/service-5.webp',
    width: 1200,
    height: 800,
    quality: 80
  },
  {
    input: 'public/img/grid-section/Rejuvie-Dental-Bali-Patient-1-1920x1920.jpg',
    output: 'public/assets/service-6.webp',
    width: 1200,
    height: 800,
    quality: 80
  },

  // Testimonial images
  {
    input: 'public/img/grid-section/Rejuvie-Dental-Bali-Patient-1-1920x1920.jpg',
    output: 'public/assets/testimonial-1.webp',
    width: 400,
    height: 400,
    quality: 85
  },
  {
    input: 'public/img/slides-hero/atikah-akhtar-gzfIO69Q6eM-unsplash.jpg',
    output: 'public/assets/testimonial-2.webp',
    width: 400,
    height: 400,
    quality: 85
  },

  // Gallery images
  {
    input: 'public/img/grid-section/result-treatment-1-1024x1024.jpg',
    output: 'public/assets/gallery-1.webp',
    width: 800,
    height: 800,
    quality: 80
  },
  {
    input: 'public/img/grid-section/antri-wrinkle-injection1.jpg',
    output: 'public/assets/gallery-2.webp',
    width: 800,
    height: 800,
    quality: 80
  },
  {
    input: 'public/img/grid-section/Rejuvie-Dental-Bali-Patient-1-1920x1920.jpg',
    output: 'public/assets/gallery-3.webp',
    width: 800,
    height: 800,
    quality: 80
  },
  {
    input: 'public/img/slides-hero/karelys-ruiz-PqyzuzFiQfY-unsplash.jpg',
    output: 'public/assets/gallery-4.webp',
    width: 800,
    height: 800,
    quality: 80
  }
];

async function convertImages() {
  console.log('🖼️  Starting image conversion to WebP...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const config of conversions) {
    try {
      const inputPath = path.join(__dirname, config.input);
      const outputPath = path.join(__dirname, config.output);

      // Check if input file exists
      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  Skipping ${config.input} (not found)`);
        errorCount++;
        continue;
      }

      // Convert to WebP
      await sharp(inputPath)
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({
          quality: config.quality,
          effort: 6 // Higher effort = better compression
        })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(2);

      console.log(`✅ ${path.basename(config.output)} - ${sizeKB} KB`);
      successCount++;

    } catch (error) {
      console.error(`❌ Error converting ${config.input}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Conversion complete!`);
  console.log(`   Success: ${successCount} images`);
  console.log(`   Errors: ${errorCount} images`);
  console.log(`\n💡 Next step: Update image extensions in components from .jpg to .webp`);
}

convertImages().catch(console.error);
