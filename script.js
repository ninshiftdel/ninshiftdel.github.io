// =========================================================
// HIGHLIGHT CURRENT SECTION IN THE NAV BAR
// When you scroll, the matching menu link lights up
// =========================================================
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--text-primary)';
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
})();


// =========================================================
// MOBILE HAMBURGER MENU
// Opens and closes the menu on small screens
// =========================================================
(function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        // Close the menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        // Close the menu when clicking outside of it
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
})();


// =========================================================
// LOGO CLICK — SCROLL TO TOP
// Clicking "niño.lucero" smooth-scrolls back to the top
// =========================================================
(function() {
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('nav-links');
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
})();


// =========================================================
// PROJECT FILTER TABS
// Click "SOC", "Networking", "AI", or "Web Dev" to filter projects
// =========================================================
(function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (!filterButtons.length || !projectItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Highlight the clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Show or hide projects based on the selected filter
            projectItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = '';
                    // Small fade-in animation
                    item.style.opacity = '0';
                    item.style.transition = 'opacity 0.3s ease';
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                    });
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
})();


// =========================================================
// POPUP IMAGE VIEWER
// Clicking a thumbnail opens a bigger version in a popup
// =========================================================
(function() {
    const imageModal = document.getElementById('imageModal');
    const imageModalOverlay = document.getElementById('imageModalOverlay');
    const imageModalClose = document.getElementById('imageModalClose');
    const imageModalImg = document.getElementById('imageModalImg');

    if (!imageModal) return;

    // Watch for clicks on project images and certificate images
    document.addEventListener('click', function(e) {
        const imageItem = e.target.closest('.project-image-item');
        const certificateImage = e.target.closest('.certificate-image');

        if (imageItem) {
            const img = imageItem.querySelector('img');
            if (img) openImageModal(img.src, img.alt);
        } else if (certificateImage) {
            const img = certificateImage.querySelector('img');
            if (img) openImageModal(img.src, img.alt);
        }
    });

    function openImageModal(src, alt) {
        imageModalImg.src = src;
        imageModalImg.alt = alt || 'Enlarged view';
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
        // Clear the image after the close animation finishes
        setTimeout(() => {
            imageModalImg.src = '';
        }, 300);
    }

    if (imageModalClose) imageModalClose.addEventListener('click', closeImageModal);
    if (imageModalOverlay) imageModalOverlay.addEventListener('click', closeImageModal);

    // Press Escape to close the popup
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });
})();


// =========================================================
// HOVER TOOLTIP FOR EXTERNAL LINKS
// Shows a small hint like "You'll be directed to GitHub"
// when hovering over "View Code" or platform cards
// =========================================================
(function() {
    // Create the tooltip element once and attach it to the page
    const tooltip = document.createElement('div');
    tooltip.className = 'link-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    document.body.appendChild(tooltip);

    // Figure out which site a link goes to, based on the URL
    function getDestination(url) {
        if (!url) return 'an external site';
        const lower = url.toLowerCase();
        if (lower.includes('github.com')) return 'GitHub';
        if (lower.includes('drive.google.com')) return 'Google Drive';
        if (lower.includes('docs.google.com')) return 'Google Docs';
        if (lower.includes('linkedin.com')) return 'LinkedIn';
        if (lower.includes('vercel.app') || lower.includes('vercel.com')) return 'Vercel';
        if (lower.includes('netlify.app')) return 'Netlify';
        if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'YouTube';
        if (lower.includes('medium.com')) return 'Medium';
        if (lower.includes('tryhackme.com')) return 'TryHackMe';
        if (lower.includes('letsdefend.io')) return 'LetsDefend';
        if (lower.includes('blueteamlabs.online')) return 'Blue Team Labs';
        if (lower.includes('hackthebox.com')) return 'Hack The Box';
        if (lower.includes('virustotal.com')) return 'VirusTotal';
        return 'an external site';
    }

    // Prefer the manual label (data-destination) if it exists
    function getLabel(anchor) {
        if (anchor.dataset.destination) return anchor.dataset.destination;
        return getDestination(anchor.getAttribute('href'));
    }

    // Which elements should show the tooltip
    const selector = '.project-actions .btn, .certificate-link, .platform-card';

    // Position the tooltip above (or below) the hovered element
    function positionTooltip(anchor) {
        const rect = anchor.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 12;

        // Keep it inside the viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }

        // If it would go off the top of the screen, put it below instead
        if (top < 10) {
            top = rect.bottom + 12;
            tooltip.classList.add('below');
        } else {
            tooltip.classList.remove('below');
        }

        tooltip.style.top = (top + window.scrollY) + 'px';
        tooltip.style.left = (left + window.scrollX) + 'px';
    }

    // Show tooltip on hover
    document.addEventListener('mouseover', function(e) {
        const anchor = e.target.closest(selector);
        if (!anchor) return;

        const href = anchor.getAttribute('href') || '';
        if (!href || href === '#' || href.startsWith('javascript:')) {
            tooltip.textContent = 'Link coming soon';
            tooltip.classList.add('visible', 'coming-soon');
        } else {
            const label = getLabel(anchor);
            tooltip.textContent = `You'll be directed to ${label} ↗`;
            tooltip.classList.remove('coming-soon');
            tooltip.classList.add('visible');
        }

        // Wait a moment so the tooltip has size before positioning
        requestAnimationFrame(() => positionTooltip(anchor));
    });

    // Hide tooltip when the mouse leaves
    document.addEventListener('mouseout', function(e) {
        const anchor = e.target.closest(selector);
        if (!anchor) return;
        tooltip.classList.remove('visible', 'coming-soon');
    });

    // Hide tooltip if the user scrolls (avoids a stuck tooltip)
    window.addEventListener('scroll', function() {
        tooltip.classList.remove('visible', 'coming-soon');
    }, { passive: true });
})();
