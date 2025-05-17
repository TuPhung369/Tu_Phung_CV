// Fix background scrolling
document.addEventListener("DOMContentLoaded", function() {
    // Create background container if it doesn't exist
    let background = document.querySelector('.background');
    if (!background) {
        background = document.createElement('div');
        background.className = 'background';
        document.body.insertBefore(background, document.body.firstChild);
    }
    
    // Function to update background position based on scroll
    function updateBackgroundPosition() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        
        // Make sure background is at least as tall as the document
        background.style.height = documentHeight + 'px';
        
        // Apply a parallax effect - background moves slower than content
        // Use translateZ(0) to force hardware acceleration for smoother animation
        background.style.transform = `translateY(0) translateZ(0)`;
        
        // Update positions of all circles to create parallax effect
        const circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
            const depth = getDepthFactor(circle);
            const translateY = scrollY * depth;
            circle.style.transform = `translateY(${translateY}px) translateZ(0)`;
        });
    }
    
    // Get depth factor based on circle's depth class
    function getDepthFactor(circle) {
        if (circle.classList.contains('depth-furthest')) return 0.1;
        if (circle.classList.contains('depth-far')) return 0.15;
        if (circle.classList.contains('depth-mid-far')) return 0.2;
        if (circle.classList.contains('depth-mid')) return 0.25;
        if (circle.classList.contains('depth-mid-close')) return 0.3;
        if (circle.classList.contains('depth-close')) return 0.35;
        if (circle.classList.contains('depth-closest')) return 0.4;
        if (circle.classList.contains('depth-front')) return 0.45;
        return 0.3; // Default
    }

    // Use requestAnimationFrame for smoother scrolling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateBackgroundPosition();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Update on resize too
    window.addEventListener('resize', function() {
        updateBackgroundPosition();
    });
    
    // Initial call to set position
    updateBackgroundPosition();
});