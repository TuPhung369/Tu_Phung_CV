// This script minifies the CSS file to improve performance
// Run this script with Node.js after installing clean-css: npm install clean-css

const CleanCSS = require('clean-css');
const fs = require('fs');
const path = require('path');

async function minifyCSS() {
  try {
    // Check if cv.css exists
    if (!fs.existsSync('cv.css')) {
      console.error('cv.css not found');
      return;
    }

    // Read the CSS file
    const css = fs.readFileSync('cv.css', 'utf8');

    // Minify the CSS
    const minified = new CleanCSS({
      level: 2, // Advanced optimization
      compatibility: '*', // IE8+ compatibility
      format: 'keep-breaks' // Keep line breaks for better readability
    }).minify(css);

    // Create minified version
    fs.writeFileSync('cv.min.css', minified.styles);

    // Log results
    console.log('CSS minified successfully');
    console.log(`Original size: ${css.length} bytes`);
    console.log(`Minified size: ${minified.styles.length} bytes`);
    console.log(`Saved: ${css.length - minified.styles.length} bytes (${Math.round((css.length - minified.styles.length) / css.length * 100)}%)`);
  } catch (error) {
    console.error('Error minifying CSS:', error);
  }
}

minifyCSS();