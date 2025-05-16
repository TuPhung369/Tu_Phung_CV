// Simple Circles Generator
document.addEventListener("DOMContentLoaded", function () {
  // Create background container
  const body = document.body;

  // Remove existing background if it exists
  const existingBackground = document.querySelector(".background");
  if (existingBackground) {
    existingBackground.remove();
  }

  // Create a main background container that covers the entire viewport
  const backgroundContainer = document.createElement("div");
  backgroundContainer.className = "background";
  backgroundContainer.style.position = "fixed";
  backgroundContainer.style.top = "0";
  backgroundContainer.style.left = "0";
  backgroundContainer.style.right = "0"; // Ensure it spans the full width
  backgroundContainer.style.bottom = "0"; // Ensure it spans the full height
  backgroundContainer.style.width = "100%"; // Use full width
  backgroundContainer.style.height = "100%"; // Use full height
  backgroundContainer.style.zIndex = "-1"; // Set z-index to be behind content
  backgroundContainer.style.pointerEvents = "none"; // Make sure it doesn't interfere with clicks
  backgroundContainer.style.overflow = "hidden"; // Hide overflow

  // Add container to body
  document.body.appendChild(backgroundContainer); // Add to end of body

  // Create a simple animation for the circles
  function createCircles() {
    // We'll create a simple animation that doesn't depend on scroll position

    // Create circles for the background
    const circleCount = 500; // Increased number for better coverage

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Function to create a single circle
    function createCircle(container) {
      const circle = document.createElement("div");

      // Random size with more variety
      const sizes = [
        "nano",
        "micro",
        "tiny",
        "small",
        "medium",
        "large",
        "xlarge",
      ];
      const size = sizes[Math.floor(Math.random() * sizes.length)];

      // Random color from our galaxy colors
      const colors = [
        "red",
        "blue",
        "green",
        "purple",
        "teal",
        "orange",
        "gold",
        "pink",
        "cyan",
        "magenta",
        "yellow",
        "lime",
        "blue-violet",
        "coral",
        "crimson",
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
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Random opacity with more variety
      const opacities = [
        "ultra-low",
        "very-low",
        "low",
        "medium-low",
        "medium",
        "medium-high",
        "high",
        "very-high",
        "ultra-high",
      ];
      const opacity = opacities[Math.floor(Math.random() * opacities.length)];

      // Random depth
      const depths = [
        "furthest",
        "far",
        "mid-far",
        "mid",
        "mid-close",
        "close",
        "closest",
        "front",
      ];
      const depth = depths[Math.floor(Math.random() * depths.length)];

      // Random animation
      const animations = ["slow", "medium", "fast"];
      const animation =
        animations[Math.floor(Math.random() * animations.length)];

      // Add sparkle to some circles
      const sparkle = Math.random() > 0.7 ? " sparkle" : "";

      // Set class and position
      circle.className = `circle size-${size} color-${color} opacity-${opacity} depth-${depth} anim-${animation}${sparkle}`;

      // Distribute circles evenly throughout the viewport
      // Use percentage values for better distribution across different screen sizes
      const topPercent = Math.random() * 100;
      const leftPercent = Math.random() * 100;

      circle.style.top = `${topPercent}%`;
      circle.style.left = `${leftPercent}%`;

      // Add to container
      container.appendChild(circle);

      return circle;
    }

    // Create circles for the background - distribute them with more on the sides and fewer in the middle
    // Define areas with weights (percentage of total circles)
    const areas = [
      { xStart: 0, xEnd: 20, yStart: 0, yEnd: 100, weight: 0.1 }, // Left side (45%)
      { xStart: 20, xEnd: 80, yStart: 0, yEnd: 100, weight: 0.02 }, // Middle (10%)
      { xStart: 80, xEnd: 100, yStart: 0, yEnd: 100, weight: 0.1 }, // Right side (45%)
    ];

    // Calculate circles per area based on weights
    const getCirclesForArea = (area) => Math.floor(circleCount * area.weight);

    areas.forEach((area) => {
      const circlesForThisArea = getCirclesForArea(area);
      for (let i = 0; i < circlesForThisArea; i++) {
        const circle = document.createElement("div");

        // Random size with more variety
        const sizes = [
          "nano",
          "micro",
          "tiny",
          "small",
          "medium",
          "large",
          "xlarge",
        ];
        const size = sizes[Math.floor(Math.random() * sizes.length)];

        // Random color
        const colors = [
          "red",
          "blue",
          "green",
          "purple",
          "teal",
          "orange",
          "gold",
          "pink",
          "cyan",
          "magenta",
          "yellow",
          "lime",
          "blue-violet",
          "coral",
          "crimson",
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
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Random opacity
        const opacities = [
          "ultra-low",
          "very-low",
          "low",
          "medium-low",
          "medium",
          "medium-high",
          "high",
          "very-high",
          "ultra-high",
        ];
        const opacity = opacities[Math.floor(Math.random() * opacities.length)];

        // Random depth
        const depths = [
          "furthest",
          "far",
          "mid-far",
          "mid",
          "mid-close",
          "close",
          "closest",
          "front",
        ];
        const depth = depths[Math.floor(Math.random() * depths.length)];

        // Random animation
        const animations = ["slow", "medium", "fast"];
        const animation =
          animations[Math.floor(Math.random() * animations.length)];

        // Add sparkle to some circles
        const sparkle = Math.random() > 0.7 ? " sparkle" : "";

        // Set class
        circle.className = `circle size-${size} color-${color} opacity-${opacity} depth-${depth} anim-${animation}${sparkle}`;

        // Position within the specific area
        const topPercent =
          area.yStart + Math.random() * (area.yEnd - area.yStart);
        const leftPercent =
          area.xStart + Math.random() * (area.xEnd - area.xStart);

        circle.style.top = `${topPercent}%`;
        circle.style.left = `${leftPercent}%`;

        // Add to container
        backgroundContainer.appendChild(circle);
      }
    });

    // Calculate total circles created
    const totalCreatedCircles = areas.reduce(
      (sum, area) => sum + getCirclesForArea(area),
      0
    );

    // Add remaining circles randomly across the entire screen (if any due to rounding)
    const remainingCircles = circleCount - totalCreatedCircles;
    for (let i = 0; i < remainingCircles; i++) {
      createCircle(backgroundContainer);
    }

    // Add a resize observer to adjust when window size changes
    const resizeObserver = new ResizeObserver((entries) => {
      // Clear existing circles
      while (backgroundContainer.firstChild) {
        backgroundContainer.removeChild(backgroundContainer.firstChild);
      }

      // Recreate circles for the new viewport size using the same distribution method
      const areas = [
        { xStart: 0, xEnd: 20, yStart: 0, yEnd: 100, weight: 0.1 }, // Left side (45%)
        { xStart: 20, xEnd: 80, yStart: 0, yEnd: 100, weight: 0.02 }, // Middle (10%)
        { xStart: 80, xEnd: 100, yStart: 0, yEnd: 100, weight: 0.1 }, // Right side (45%)
      ];

      // Calculate circles per area based on weights
      const getCirclesForArea = (area) => Math.floor(circleCount * area.weight);

      areas.forEach((area) => {
        const circlesForThisArea = getCirclesForArea(area);
        for (let i = 0; i < circlesForThisArea; i++) {
          const circle = document.createElement("div");

          // Random size with more variety
          const sizes = [
            "nano",
            "micro",
            "tiny",
            "small",
            "medium",
            "large",
            "xlarge",
          ];
          const size = sizes[Math.floor(Math.random() * sizes.length)];

          // Random color
          const colors = [
            "red",
            "blue",
            "green",
            "purple",
            "teal",
            "orange",
            "gold",
            "pink",
            "cyan",
            "magenta",
            "yellow",
            "lime",
            "blue-violet",
            "coral",
            "crimson",
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
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];

          // Random opacity
          const opacities = [
            "ultra-low",
            "very-low",
            "low",
            "medium-low",
            "medium",
            "medium-high",
            "high",
            "very-high",
            "ultra-high",
          ];
          const opacity =
            opacities[Math.floor(Math.random() * opacities.length)];

          // Random depth
          const depths = [
            "furthest",
            "far",
            "mid-far",
            "mid",
            "mid-close",
            "close",
            "closest",
            "front",
          ];
          const depth = depths[Math.floor(Math.random() * depths.length)];

          // Random animation
          const animations = ["slow", "medium", "fast"];
          const animation =
            animations[Math.floor(Math.random() * animations.length)];

          // Add sparkle to some circles
          const sparkle = Math.random() > 0.7 ? " sparkle" : "";

          // Set class
          circle.className = `circle size-${size} color-${color} opacity-${opacity} depth-${depth} anim-${animation}${sparkle}`;

          // Position within the specific area
          const topPercent =
            area.yStart + Math.random() * (area.yEnd - area.yStart);
          const leftPercent =
            area.xStart + Math.random() * (area.xEnd - area.xStart);

          circle.style.top = `${topPercent}%`;
          circle.style.left = `${leftPercent}%`;

          // Add to container
          backgroundContainer.appendChild(circle);
        }
      });

      // Calculate total circles created
      const totalCreatedCircles = areas.reduce(
        (sum, area) => sum + getCirclesForArea(area),
        0
      );

      // Add remaining circles randomly across the entire screen (if any due to rounding)
      const remainingCircles = circleCount - totalCreatedCircles;
      for (let i = 0; i < remainingCircles; i++) {
        createCircle(backgroundContainer);
      }
    });

    // Observe the body element for size changes
    resizeObserver.observe(document.body);
  }

  // Create the circles
  createCircles();
});

