// This script converts the avatar.jpg to WebP format for better performance
// Run this script with Node.js after installing sharp: npm install sharp

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertToWebP() {
  try {
    // Check if avatar.jpg exists
    if (!fs.existsSync('avatar.jpg')) {
      console.error('avatar.jpg not found');
      return;
    }

    // Convert to WebP with quality 80 (good balance between quality and size)
    await sharp('avatar.jpg')
      .resize({ width: 280, height: 280 }) // 2x size for high DPI displays
      .webp({ quality: 80 })
      .toFile('avatar.webp');

    // Also create a smaller version for mobile
    await sharp('avatar.jpg')
      .resize({ width: 140, height: 140 })
      .webp({ quality: 75 })
      .toFile('avatar-mobile.webp');

    console.log('Conversion complete: avatar.webp and avatar-mobile.webp created');
  } catch (error) {
    console.error('Error converting image:', error);
  }
}

convertToWebP();