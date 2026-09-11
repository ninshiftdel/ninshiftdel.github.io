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
    const nextBtn = document.getElementById('g

                                            
