// ===== ACTIVE NAV LINK =====
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

// ===== HAMBURGER MENU =====
(function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
})();

// ===== LOGO CLICK – SCROLL TO TOP =====
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

// ===== PROJECT GALLERY =====
(function() {
    const projectsData = [
        {
            title: "Portfolio Website",
            description: "Developed a custom portfolio site using modern HTML, CSS, and JavaScript to centralize my projects and resume.",
            images: [
                "images/Portfolio Website/contact me.png",
                "images/Portfolio Website/homeoage.png",
                "images/Portfolio Website/page.png"
            ]
        },
        {
            title: "Basic Office LAN",
            description: "Designed and deployed a stable Local Area Network for a small office environment.",
            images: [
                "images/Project 1/arp -a.png",
                "images/Project 1/IP Addresses.png",
                "images/Project 1/Network Topology.png",
                "images/Project 1/Ping Results.png"
            ]
        },
        {
            title: "Department VLAN Network",
            description: "Implemented VLAN segmentation to isolate traffic across different departments.",
            images: [
                "images/Project 2/IP Address.png",
                "images/Project 2/IP Addresses.png",
                "images/Project 2/Network Topology.png"
            ]
        },
        {
            title: "DHCP Automation",
            description: "Automated IP address management by deploying a centralized DHCP server.",
            images: [
                "images/Project 3/IP ADDRESS BINDINGS.png",
                "images/Project 3/PC - DHCP= Enabled.png",
                "images/Project 3/Topology.png"
            ]
        },
        {
            title: "Layer 2 Security",
            description: "Hardened the access layer against internal and external threats.",
            images: [
                "images/workonprogress.png"
            ]
        }
    ];

    const modal = document.getElementById('galleryModal');
    const overlay = document.getElementById('galleryOverlay');
    const closeBtn = document.getElementById('galleryClose');
    const titleEl = document.getElementById('galleryTitle');
    const descEl = document.getElementById('galleryDescription');
    const imagesContainer = document.getElementById('galleryImages');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const counterEl = document.getElementById('galleryCounter');

    if (!modal) return;

    let currentProject = 0;
    let currentImage = 0;
    let projectImages = [];

    document.querySelectorAll('.project-card.clickable').forEach(card => {
        card.addEventListener('click', function() {
            const projectIndex = parseInt(this.dataset.project, 10);
            openGallery(projectIndex);
        });
    });

    function openGallery(index) {
        const project = projectsData[index];
        if (!project) return;

        currentProject = index;
        currentImage = 0;
        projectImages = project.images;

        titleEl.textContent = project.title;
        descEl.textContent = project.description;

        renderImages();
        updateCounter();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function renderImages() {
        imagesContainer.innerHTML = '';
        projectImages.forEach((src, i) => {
            const div = document.createElement('div');
            div.className = 'gallery-image-item';
            if (i === currentImage) {
                div.style.borderColor = 'var(--accent)';
            }
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Project image ${i + 1}`;
            img.loading = 'lazy';
            div.appendChild(img);

            div.addEventListener('click', function() {
                window.open(src, '_blank');
            });

            imagesContainer.appendChild(div);
        });

        const items = imagesContainer.querySelectorAll('.gallery-image-item');
        items.forEach((item, i) => {
            item.style.borderColor = i === currentImage ? 'var(--accent)' : 'var(--border-subtle)';
        });
    }

    function updateCounter() {
        counterEl.textContent = `${currentImage + 1} / ${projectImages.length}`;
    }

    function goToImage(index) {
        if (index < 0) index = projectImages.length - 1;
        if (index >= projectImages.length) index = 0;
        currentImage = index;
        renderImages();
        updateCounter();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToImage(currentImage - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToImage(currentImage + 1));

    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') goToImage(currentImage - 1);
        if (e.key === 'ArrowRight') goToImage(currentImage + 1);
    });

    function closeGallery() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeGallery);
    if (overlay) overlay.addEventListener('click', closeGallery);
})();

// ===== PROJECT IMAGE MODAL =====
(function() {
    const imageModal = document.getElementById('imageModal');
    const imageModalOverlay = document.getElementById('imageModalOverlay');
    const imageModalClose = document.getElementById('imageModalClose');
    const imageModalImg = document.getElementById('imageModalImg');

    if (!imageModal) return;

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
        setTimeout(() => {
            imageModalImg.src = '';
        }, 300);
    }

    if (imageModalClose) imageModalClose.addEventListener('click', closeImageModal);
    if (imageModalOverlay) imageModalOverlay.addEventListener('click', closeImageModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });
})();
