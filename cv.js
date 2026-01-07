// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme
  initializeTheme();

  // Set up theme toggle
  setupThemeToggle();

  // Lazy load Mermaid diagrams
  if (typeof mermaid !== "undefined") {
    // Only load Mermaid if diagrams are in viewport
    const mermaidObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          renderMermaidDiagrams();
          mermaidObserver.disconnect(); // Only need to initialize once
        }
      });
    });

    // Observe mermaid containers
    const mermaidDiagrams = document.querySelectorAll(".mermaid");
    if (mermaidDiagrams.length > 0) {
      mermaidDiagrams.forEach((diagram) => mermaidObserver.observe(diagram));
    }
  }

  // Set up other event listeners
  setupEventListeners();

  // Apply dynamic grid layout
  applyDynamicGridLayout();

  // Simplified hover effect for strength items
  const strengthItems = document.querySelectorAll(".strength-item");
  strengthItems.forEach((item) => {
    item.classList.add("hover-effect"); // Use CSS classes instead of inline styles
  });

  // Simplified technical skills animation
  const techSkills = document.querySelectorAll(".tech-skill");

  // Create a single intersection observer for all tech skills
  const techObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          techObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "50px" }
  );

  // Set initial styles with CSS classes
  techSkills.forEach((skill) => {
    skill.classList.add("tech-skill-animate");
    techObserver.observe(skill);
  });
});

// Initialize theme based on saved preference
function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeTooltip = document.querySelector(".theme-tooltip");
  if (!themeToggle) return;

  // Check for saved theme preference or use dark mode as default
  const savedTheme = localStorage.getItem("theme");
  const isLight = savedTheme === "light";

  if (isLight) {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌞"; // Sun emoji for light mode
  } else {
    // Dark mode is default (no class needed as it's in :root)
    themeToggle.textContent = "🌙"; // Moon emoji for dark mode
  }

  // Update tooltip text
  if (themeTooltip) {
    themeTooltip.textContent = isLight ? "Dark Mode" : "Light Mode";
  }
}

// Set up theme toggle button
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeTooltip = document.querySelector(".theme-tooltip");
  if (!themeToggle) return;

  // Update tooltip text based on current theme
  const updateTooltip = (isLight) => {
    if (themeTooltip) {
      themeTooltip.textContent = isLight ? "Dark Mode" : "Light Mode";
    }
  };

  // Initialize tooltip text
  const isLight = document.body.classList.contains("light-mode");
  updateTooltip(isLight);

  themeToggle.addEventListener("click", function () {
    // Toggle theme class
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");

    // Update localStorage and button icon
    if (isLight) {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌞"; // Sun emoji for light mode
    } else {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "🌙"; // Moon emoji for dark mode
    }

    // Update tooltip text
    updateTooltip(isLight);

    // Re-render Mermaid diagrams with new theme (only if Mermaid is loaded)
    setTimeout(function () {
      try {
        // Check if Mermaid is loaded
        if (typeof mermaid !== "undefined") {
          // Simply call our renderMermaidDiagrams function which will use the stored original content
          renderMermaidDiagrams();
        }

        // Reapply grid layout
        applyDynamicGridLayout();
      } catch (error) {
        console.error("Error re-rendering Mermaid diagrams:", error);
      }
    }, 200);
  });
}

// Render all Mermaid diagrams - simplified and optimized
function renderMermaidDiagrams() {
  // Check if Mermaid library is loaded
  if (typeof mermaid === "undefined") {
    console.log("Mermaid library not loaded, skipping diagram rendering");
    return;
  }
  
  try {
    // Get current theme
    const isLight = document.body.classList.contains("light-mode");
    const theme = isLight ? "default" : "dark";

    // Configure Mermaid with minimal settings
    mermaid.initialize({
      startOnLoad: false,
      theme: theme,
      securityLevel: "loose",
      logLevel: 3, // Reduce logging (0=debug, 1=info, 2=warn, 3=error, 4=fatal)
    });

    // Get all Mermaid diagrams
    const diagrams = document.querySelectorAll(".mermaid");
    if (diagrams.length === 0) return;

    // Reset and restore original content for each diagram
    diagrams.forEach((diagram, index) => {
      // Only process diagrams that haven't been rendered yet
      if (!diagram.hasAttribute("data-processed")) {
        // Restore the original content from our saved array if needed
        if (
          window.originalMermaidContent &&
          window.originalMermaidContent[index]
        ) {
          diagram.textContent = window.originalMermaidContent[index];
        }
      }
    });

    // Use the appropriate API based on Mermaid version
    if (typeof mermaid.run === "function") {
      // Mermaid 10.x API
      mermaid.run({ nodes: diagrams }).catch(() => {
        // Fallback to old API if needed
        if (typeof mermaid.init === "function") {
          mermaid.init(undefined, diagrams);
        }
      });
    } else if (typeof mermaid.init === "function") {
      // Mermaid 9.x API
      mermaid.init(undefined, diagrams);
    }
  } catch (error) {
    console.error("Error rendering Mermaid diagrams:", error);
  }
}

// Apply dynamic grid layout to tech-skills sections
function applyDynamicGridLayout() {
  try {
    // Target all tech-skills containers
    const techSkillsContainers = document.querySelectorAll(".tech-skills");

    techSkillsContainers.forEach(function (container) {
      const items = container.querySelectorAll(".tech-skill");
      const itemCount = items.length;
      const windowWidth = window.innerWidth;

      // Clear inline styles first to let CSS media queries work
      container.style.gridTemplateColumns = "";
      
      // Only apply custom grid on larger screens where CSS doesn't handle it well
      if (windowWidth > 1200) {
        // Apply grid layout based on number of items
        if (itemCount >= 3 && itemCount % 2 === 1) {
          // If 3 or more items and odd number, use 3 columns
          container.style.gridTemplateColumns = "repeat(3, 1fr)";
        } else if (itemCount >= 2) {
          // Otherwise use 2 columns for 2+ items
          container.style.gridTemplateColumns = "repeat(2, 1fr)";
        }
      }
      // For smaller screens (<=1200px), let CSS media queries handle it
      
      // Reset item width to let CSS handle it
      items.forEach(function (item) {
        item.style.width = "";
      });
    });
  } catch (error) {
    console.error("Error applying grid layout:", error);
  }
}

// Set up other event listeners
function setupEventListeners() {
  // Add click handlers for contact links
  const emailLink = document.querySelector('a[href^="mailto:"]');
  const phoneLink = document.querySelector('a[href^="tel:"]');

  if (emailLink) {
    emailLink.addEventListener("click", function (e) {
      e.preventDefault();
      const email = this.getAttribute("href").replace("mailto:", "");
      window.location.href = "mailto:" + email;
    });
  }

  if (phoneLink) {
    phoneLink.addEventListener("click", function (e) {
      e.preventDefault();
      const phone = this.getAttribute("href").replace("tel:", "");
      window.location.href = "tel:" + phone;
    });
  }

  // Make sure progress bars are visible
  const skillBars = document.querySelectorAll(".progress");

  // Make sure all progress bars are visible with their correct width
  skillBars.forEach((bar) => {
    // Ensure the progress bar is visible
    bar.style.display = "block";
  });

  // Add window resize handler
  window.addEventListener("resize", function () {
    applyDynamicGridLayout();
  });

  // Setup lazy loading for QR codes
  setupLazyLoadQRCodes();

  // Language selector dropdown toggle - SIMPLIFIED VERSION
  const languageGlobe = document.getElementById("languageGlobe");
  const languageDropdown = document.getElementById("languageDropdown");
  
  
  if (languageGlobe && languageDropdown) {
    
    // Show dropdown on hover
    languageGlobe.addEventListener("mouseenter", function() {
      languageDropdown.classList.add("show");
    });
    
    // Keep dropdown visible when hovering over it
    languageDropdown.addEventListener("mouseenter", function() {
      languageDropdown.classList.add("show");
    });
    
    // Hide when mouse leaves both globe and dropdown
    languageGlobe.addEventListener("mouseleave", function(e) {
      // Use setTimeout to allow moving to dropdown
      setTimeout(function() {
        if (!languageDropdown.matches(':hover') && !languageGlobe.matches(':hover')) {
          languageDropdown.classList.remove("show");
        }
      }, 100);
    });
    
    languageDropdown.addEventListener("mouseleave", function() {
      setTimeout(function() {
        if (!languageDropdown.matches(':hover') && !languageGlobe.matches(':hover')) {
          languageDropdown.classList.remove("show");
        }
      }, 100);
    });
    
    // Toggle on click
    languageGlobe.addEventListener("click", function(e) {
      e.stopPropagation();
      languageDropdown.classList.toggle("show");
    });
    
    // Close when clicking outside
    document.addEventListener("click", function(e) {
      if (!languageGlobe.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.classList.remove("show");
      }
    });
  } else {
    console.log("Language selector elements NOT found!"); // Debug
  }

  // processing for the avatar image
  const avatar = document.getElementById("avatar");
  const modal = document.getElementById("avatarModal");
  const closeModal = document.getElementById("closeModal");

  // Only add event listeners if elements exist
  if (avatar && modal) {
    // open modal when click on
    avatar.addEventListener("click", () => {
      modal.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    });

    // close modal when click outside the image
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        document.body.style.overflow = ""; // Restore scrolling
      }
    });

    // Add keyboard event to close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        modal.classList.remove("show");
        document.body.style.overflow = ""; // Restore scrolling
      }
    });
  }

  // Only add event listener if closeModal exists
  if (closeModal) {
    // close modal when click on close button
    closeModal.addEventListener("click", () => {
      modal.classList.remove("show");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }
}

// Setup lazy loading for QR codes
function setupLazyLoadQRCodes() {
  // Only load QR codes when they come into view
  const qrObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");

          if (src) {
            // Check if we're on mobile
            const isMobile = window.innerWidth <= 768;

            // On mobile, use a smaller size for QR codes
            if (isMobile) {
              // Replace size parameter in URL
              const smallerSrc = src.replace("size=150x150", "size=100x100");
              img.src = smallerSrc;
            } else {
              img.src = src;
            }

            // Remove data-src to prevent loading again
            img.removeAttribute("data-src");

            // Stop observing this image
            qrObserver.unobserve(img);
          }
        }
      });
    },
    { rootMargin: "200px" }
  ); // Start loading when QR codes are 200px from viewport

  // Observe all lazy QR codes
  const lazyQRs = document.querySelectorAll(".lazy-qr");
  lazyQRs.forEach((qr) => qrObserver.observe(qr));
}

