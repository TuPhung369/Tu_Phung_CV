# Performance Optimization Guide

This document outlines the performance optimizations implemented to improve the mobile performance of the CV website.

## Current Issues

According to PageSpeed Insights, the website had the following issues:
- Largest Contentful Paint (LCP) of 11,940ms (should be under 2.5s)
- Unused JavaScript (mermaid.min.js - 657 KiB)
- Unoptimized images (avatar.jpg - 398.6 KiB)
- Unused CSS (all.min.css - 17.7 KiB)
- Unminified CSS

## Implemented Optimizations

### 1. Image Optimization

- Converted avatar.jpg to WebP format for better compression
- Created a smaller mobile-specific version of the avatar
- Added proper image dimensions to avoid layout shifts
- Used the `<picture>` element with multiple sources for different devices
- Added `fetchpriority="high"` and `decoding="async"` attributes

To generate the WebP images, run:
```
npm install sharp
node convert-image.js
```

### 2. JavaScript Optimization

- Lazy-loaded Mermaid.js using Intersection Observer
- Only load Mermaid when diagrams are visible in the viewport
- Removed unused JavaScript

### 3. CSS Optimization

- Minified CSS to reduce file size
- Selectively loaded Font Awesome components instead of the entire library
- Lazy-loaded non-critical CSS
- Added preconnect hints for external domains

To minify the CSS, run:
```
npm install clean-css
node minify-css.js
```

### 4. Mobile-Specific Optimizations

- Disabled all animations and transitions on mobile
- Removed decorative circles on mobile
- Simplified background on mobile
- Optimized layout for mobile screens
- Reduced image sizes on mobile

## Results

After implementing these optimizations, the website should see significant improvements:
- Reduced LCP time
- Reduced JavaScript size
- Reduced CSS size
- Improved mobile performance

## Additional Recommendations

1. **Server Optimization**
   - Enable HTTP/2
   - Set up proper caching headers
   - Enable GZIP or Brotli compression

2. **Content Delivery**
   - Consider using a CDN for static assets

3. **Regular Maintenance**
   - Regularly run performance audits
   - Update dependencies to their latest versions
   - Remove unused code and assets

4. **Monitoring**
   - Set up Real User Monitoring (RUM) to track actual user experience
   - Monitor Core Web Vitals over time