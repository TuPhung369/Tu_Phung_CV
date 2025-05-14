// Script to optimize print layout
document.addEventListener("DOMContentLoaded", function () {
  // Function to optimize multi-column layout for skills
  function optimizeSkillColumns() {
    const techSkillsContainers = document.querySelectorAll(".tech-skills");

    techSkillsContainers.forEach((container) => {
      const skills = container.querySelectorAll(".tech-skill");

      // Adjust column count based on number of skills
      if (skills.length <= 3) {
        container.style.columnCount = skills.length;
      } else if (skills.length <= 6) {
        container.style.columnCount = 2;
      } else {
        container.style.columnCount = 3;
      }

      // Ensure proper display for each skill
      skills.forEach((skill) => {
        skill.style.display = "block";
        skill.style.breakInside = "avoid";

        const icon = skill.querySelector(".tech-skill-icon");
        const content = skill.querySelector(".tech-skill-content");

        if (icon) {
          icon.style.display = "inline-block";
          icon.style.float = "left";
        }

        if (content) {
          content.style.display = "block";
          content.style.marginLeft = "20px";
        }
      });
    });
  }

  // Function to ensure proper page breaks
  function ensureProperPageBreaks() {
    // Get all sections
    const sections = document.querySelectorAll(".section");

    if (sections.length >= 3) {
      // Wrap the first two sections in a div to keep them together
      const strengthsSection = sections[0];
      const currentPositionSection = sections[1];
      const previousCareerSection = sections[2];

      // Find Technical Expertise section by its heading text
      let technicalExpertiseSection = null;
      for (let i = 0; i < sections.length; i++) {
        const heading = sections[i].querySelector("h2");
        if (heading && heading.textContent.includes("TECHNICAL EXPERTISE")) {
          technicalExpertiseSection = sections[i];
          break;
        }
      }

      // Create a wrapper if it doesn't exist
      if (!document.querySelector(".first-page-wrapper")) {
        const wrapper = document.createElement("div");
        wrapper.className = "first-page-wrapper";
        wrapper.style.pageBreakInside = "avoid";
        wrapper.style.breakInside = "avoid";

        // Insert wrapper before the first section
        strengthsSection.parentNode.insertBefore(wrapper, strengthsSection);

        // Move first two sections into wrapper
        wrapper.appendChild(strengthsSection);
        wrapper.appendChild(currentPositionSection);
      }

      // Ensure previous career starts on new page
      previousCareerSection.style.pageBreakBefore = "always";

      // Ensure technical expertise starts on new page
      if (technicalExpertiseSection) {
        technicalExpertiseSection.style.pageBreakBefore = "always";
      }
    }
  }

  // Run on load
  optimizeSkillColumns();
  ensureProperPageBreaks();

  // Also run before print
  window.addEventListener("beforeprint", function () {
    optimizeSkillColumns();
    ensureProperPageBreaks();
  });
});

