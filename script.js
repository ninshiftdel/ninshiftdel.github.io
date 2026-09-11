// ========================= ACTIVE NAV LINK =========================
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

// ========================= HAMBURGER MENU =========================
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

// ============================== LOGO CLICK – SCROLL TO TOP =========================
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

// ========================= PROJECT GALLERY =========================
(function() {
    const projectsData = [
        {
            title: "Portfolio Website",
            description: "Designed and deployed a stable Local Area Network for a small office environment. Configured core switching, assigned static IP schemes, and established basic connectivity to ensure seamless file sharing and internet access for all workstations.",
            images: [
                "images/Portfolio Website/contact me.png",
                "images/Portfolio Website/homeoage.png",
                "images/Portfolio Website/page.png",
            ]
        },
        {
            title: "Basic Office LAN",
            description: "Designed and deployed a stable Local Area Network for a small office environment. Configured core switching, assigned static IP schemes, and established basic connectivity to ensure seamless file sharing and internet access for all workstations.",
            images: [
                "images/Project 1/arp -a.png",
                "images/Project 1/IP Addresses.png",
                "images/Project 1/Network Topology.png",
                "images/Project 1/Ping Results.png",
            ]
        },
        {
            title: "Department VLAN Network",
            description: "Implemented VLAN segmentation to isolate traffic across different departments (e.g., HR, IT, Sales). Configured trunk links and inter-VLAN routing to improve network performance, reduce broadcast congestion, and enforce basic traffic isolation between teams.",
            images: [
                "images/Project 2/IP Address.png",
                "images/Project 2/IP Addresses.png",
                "images/Project 2/Network Topology.png",
            ]
        },
        {
            title: "DHCP Automation",
            description: "Automated IP address management by deploying a centralized DHCP server. Eliminated manual IP configuration errors, ensured dynamic and efficient address allocation, and reduced provisioning time for new devices joining the network.",
            images: [
                "images/Project 3/IP ADDRESS BINDINGS.png",
                "images/Project 3/PC - DHCP= Enabled.png",
                "images/Project 3/Topology.png"
            ]
        },
        {
            title: "Layer 2 Security",
            description: "Hardened the access layer against internal and external threats. Implemented port security, DHCP snooping, and Dynamic ARP Inspection (DAI) to prevent MAC flooding, rogue DHCP servers, and man-in-the-middle attacks at the switch level.",
            images: [
                "images/workonprogress.png",
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

    prevBtn.addEventListener('click', () => goToImage(currentImage - 1));
    nextBtn.addEventListener('click', () => goToImage(currentImage + 1));

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

    closeBtn.addEventListener('click', closeGallery);
    overlay.addEventListener('click', closeGallery);
})();

// ========================= CERTIFICATE LIGHTBOX =========================
(function() {
    const certImages = document.querySelectorAll('.certificate-image');

    if (!certImages.length) return;

    // Create lightbox element dynamically
    const lightbox = document.createElement('div');
    lightbox.className = 'certificate-lightbox';
    lightbox.innerHTML = `
        <div class="certificate-lightbox-overlay"></div>
        <div class="certificate-lightbox-content">
            <button class="certificate-lightbox-close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
            <img src="" alt="Certificate full view" class="certificate-lightbox-img" />
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.certificate-lightbox-img');
    const lightboxClose = lightbox.querySelector('.certificate-lightbox-close');
    const lightboxOverlay = lightbox.querySelector('.certificate-lightbox-overlay');

    // Open lightbox on image click
    certImages.forEach(container => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!img) return;
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
})();
