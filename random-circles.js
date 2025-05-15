// Enhanced Random Circles Generator
document.addEventListener("DOMContentLoaded", function () {
  // Get the background container
  const background = document.querySelector(".background");

  // Clear existing circles if needed
  if (background) {
    background.innerHTML = "";

    // Configuration
    const config = {
      totalCircles: 100000, // Increased number of circles for more variety
      sizes: ["nano", "micro", "tiny", "small", "medium", "large", "xlarge"],
      colors: [
        "blue",
        "purple",
        "green",
        "orange",
        "red",
        "teal",
        "pink",
        "yellow",
        "cyan",
        "lime",
        "magenta",
        // Thêm nhiều màu sắc hơn
        "blue-violet",
        "coral",
        "crimson",
        "gold",
        "indigo",
        "lavender",
        "maroon",
        "navy",
        "olive",
        "orchid",
        "plum",
        "salmon",
        "sienna",
        "turquoise",
        "violet",
      ],
      animations: [
        "ultra-slow",
        "very-slow",
        "slow",
        "normal",
        "fast",
        "very-fast",
        "ultra-fast",
      ],
      depths: [
        "furthest",
        "far",
        "mid-far",
        "mid",
        "mid-close",
        "close",
        "closest",
        "front",
      ],
      opacities: [
        "ultra-low",
        "very-low",
        "low",
        "medium-low",
        "medium",
        "medium-high",
        "high",
        "very-high",
        "ultra-high",
        "full",
      ],
    };

    // Distribution of circles by depth - Increased count for wider screens
    const depthDistribution = {
      furthest: { count: 30, sizeRange: [0, 4], opacityRange: [0, 4] }, // Blurry, large, low opacity
      far: { count: 30, sizeRange: [0, 5], opacityRange: [1, 5] },
      "mid-far": { count: 30, sizeRange: [1, 6], opacityRange: [2, 6] },
      mid: { count: 30, sizeRange: [2, 7], opacityRange: [3, 7] },
      "mid-close": { count: 25, sizeRange: [3, 8], opacityRange: [4, 8] },
      close: { count: 20, sizeRange: [0, 5], opacityRange: [5, 9] }, // Clearer, smaller, higher opacity
      closest: { count: 20, sizeRange: [0, 3], opacityRange: [6, 9] },
      front: { count: 15, sizeRange: [0, 2], opacityRange: [7, 9] }, // Very clear, very small, highest opacity
    };

    // Helper function to get random item from array with range constraints
    function getRandomFromRange(array, rangeStart, rangeEnd) {
      const start = Math.max(0, Math.min(rangeStart, array.length - 1));
      const end = Math.max(0, Math.min(rangeEnd, array.length - 1));
      const index = start + Math.floor(Math.random() * (end - start + 1));
      return array[index];
    }

    // Generate circles for each depth layer
    Object.entries(depthDistribution).forEach(([depth, settings]) => {
      for (let i = 0; i < settings.count; i++) {
        // Create a new circle element
        const circle = document.createElement("div");

        // Randomly select attributes with constraints based on depth
        const size = getRandomFromRange(
          config.sizes,
          settings.sizeRange[0],
          settings.sizeRange[1]
        );
        const color =
          config.colors[Math.floor(Math.random() * config.colors.length)];
        const animation =
          config.animations[
            Math.floor(Math.random() * config.animations.length)
          ];
        const opacity = getRandomFromRange(
          config.opacities,
          settings.opacityRange[0],
          settings.opacityRange[1]
        );

        // Generate random position with better distribution
        // Use different strategies for different depths
        let top, left;

        // Create a wider distribution that extends beyond the visible area
        // This will make circles appear to extend beyond the normal content width

        if (depth === "front" || depth === "closest") {
          // Front and closest layers mostly at the edges and beyond
          const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left

          if (edge === 0) {
            // Top edge and above
            top = Math.random() * 10 - 5; // -5% to 5%
            left = Math.random() * 120 - 10; // -10% to 110%
          } else if (edge === 1) {
            // Right edge and beyond
            top = Math.random() * 110 - 5; // -5% to 105%
            left = 90 + Math.random() * 30; // 90% to 120%
          } else if (edge === 2) {
            // Bottom edge and below
            top = 90 + Math.random() * 20; // 90% to 110%
            left = Math.random() * 120 - 10; // -10% to 110%
          } else {
            // Left edge and beyond
            top = Math.random() * 110 - 5; // -5% to 105%
            left = Math.random() * 20 - 20; // -20% to 0%
          }
        } else if (depth === "close") {
          // Close layer - near edges and slightly beyond
          const edge = Math.floor(Math.random() * 4);

          if (edge === 0) {
            // Near top
            top = Math.random() * 25 - 5; // -5% to 20%
            left = Math.random() * 120 - 10; // -10% to 110%
          } else if (edge === 1) {
            // Near right
            top = Math.random() * 110 - 5; // -5% to 105%
            left = 75 + Math.random() * 35; // 75% to 110%
          } else if (edge === 2) {
            // Near bottom
            top = 75 + Math.random() * 35; // 75% to 110%
            left = Math.random() * 120 - 10; // -10% to 110%
          } else {
            // Near left
            top = Math.random() * 110 - 5; // -5% to 105%
            left = Math.random() * 25 - 15; // -15% to 10%
          }
        } else if (depth === "furthest" || depth === "far") {
          // Furthest and far layers - widely distributed including far outside visible area
          // These create the impression of depth extending far beyond the screen
          const widePosition = Math.floor(Math.random() * 5); // 0: center, 1: far left, 2: far right, 3: far top, 4: far bottom

          if (widePosition === 0) {
            // Center area
            top = Math.random() * 100;
            left = Math.random() * 100;
          } else if (widePosition === 1) {
            // Far left
            top = Math.random() * 150 - 25; // -25% to 125%
            left = Math.random() * 50 - 50; // -50% to 0%
          } else if (widePosition === 2) {
            // Far right
            top = Math.random() * 150 - 25; // -25% to 125%
            left = 100 + Math.random() * 50; // 100% to 150%
          } else if (widePosition === 3) {
            // Far top
            top = Math.random() * 50 - 50; // -50% to 0%
            left = Math.random() * 150 - 25; // -25% to 125%
          } else {
            // Far bottom
            top = 100 + Math.random() * 50; // 100% to 150%
            left = Math.random() * 150 - 25; // -25% to 125%
          }
        } else {
          // Other mid layers - more evenly distributed but still extending beyond normal bounds
          const extendedPosition = Math.random() < 0.7;

          if (extendedPosition) {
            // 70% chance of being within extended bounds
            top = Math.random() * 120 - 10; // -10% to 110%
            left = Math.random() * 120 - 10; // -10% to 110%
          } else {
            // 30% chance of being far outside
            top = Math.random() * 200 - 50; // -50% to 150%
            left = Math.random() * 200 - 50; // -50% to 150%
          }
        }

        // Apply classes and styles
        circle.className = `circle size-${size} color-${color} opacity-${opacity} depth-${depth} anim-${animation}`;
        circle.style.top = `${top}%`;
        circle.style.left = `${left}%`;

        // Add to background
        background.appendChild(circle);
      }
    });
  }
});

