document.addEventListener('DOMContentLoaded', () => {
    populateDOMFromConfig();
    initNavbar();
    initCountdown();
    initScrollAnimations();
    initGalleryFilter();
    initLightbox();
    initFloatingPetals();
});

function populateDOMFromConfig() {
    // Couple Info
    const bPhoto = document.getElementById('bride-photo');
    if (bPhoto) bPhoto.src = WEDDING_CONFIG.couple.bride.image;

    const bName = document.getElementById('bride-name');
    if (bName) bName.textContent = WEDDING_CONFIG.couple.bride.name;

    const bBio = document.getElementById('bride-bio');
    if (bBio) bBio.textContent = WEDDING_CONFIG.couple.bride.bio;

    const gPhoto = document.getElementById('groom-photo');
    if (gPhoto) gPhoto.src = WEDDING_CONFIG.couple.groom.image;

    const gName = document.getElementById('groom-name');
    if (gName) gName.textContent = WEDDING_CONFIG.couple.groom.name;

    const gBio = document.getElementById('groom-bio');
    if (gBio) gBio.textContent = WEDDING_CONFIG.couple.groom.bio;

    // Events
    const eventsGrid = document.getElementById('events-grid');
    if (eventsGrid && WEDDING_CONFIG.events) {
        WEDDING_CONFIG.events.forEach((ev, i) => {
            let delay = (i + 1) * 0.1;
            const detailsHtml = (ev.details || []).map(d => `
                <div class="event-detail-row">
                    <div class="event-detail-icon-wrap">
                        <i class="${d.icon}"></i>
                    </div>
                    <div class="event-detail-body">
                        <span class="event-detail-label">${d.label}</span>
                        <strong class="event-detail-value">${d.value}</strong>
                        ${d.subValue ? `<span class="event-detail-sub">${d.subValue}</span>` : ''}
                        ${d.tag ? `<span class="event-detail-tag">${d.tag}</span>` : ''}
                    </div>
                </div>
            `).join('');

            const html = `
                <div class="event-card event-card-v2 animate-on-scroll" style="transition-delay: ${delay}s">
                    ${ev.tag ? `<div class="event-tag">${ev.tag}</div>` : ''}
                    <div class="event-icon-emoji">${ev.icon || '💍'}</div>
                    <h3 class="event-title">${ev.title}</h3>
                    ${ev.subtitle ? `<p class="event-subtitle">${ev.subtitle}</p>` : ''}
                    <div class="event-details-v2">
                        ${detailsHtml}
                    </div>
                    <div class="event-card-divider">
                        <span>✦</span>
                    </div>
                    ${ev.mapsUrl ? `<a href="${ev.mapsUrl}" class="btn-directions" target="_blank" rel="noopener"><i class="fas fa-directions"></i> Get Directions</a>` : ''}
                </div>
            `;
            eventsGrid.insertAdjacentHTML('beforeend', html);
        });
    }

    // Venue Maps are hardcoded in HTML now

    // Gallery
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid && WEDDING_CONFIG.gallery) {
        WEDDING_CONFIG.gallery.forEach(img => {
            const html = `
        <div class="gallery-item animate-on-scroll" data-category="${img.category}">
          <img src="${img.src}" alt="${img.caption}" loading="lazy" />
          <div class="gallery-overlay">
            <p>${img.caption}</p>
            <i class="fas fa-expand"></i>
          </div>
        </div>
      `;
            galleryGrid.insertAdjacentHTML('beforeend', html);
        });
    }

    // Contact
    const cPhone = document.getElementById('contact-phone');
    if (cPhone) cPhone.href = `tel:${WEDDING_CONFIG.contact.phone}`;

    const cDisplay = document.getElementById('contact-display');
    if (cDisplay) cDisplay.textContent = `${WEDDING_CONFIG.contact.label}: ${WEDDING_CONFIG.contact.display}`;

    // Footer & globals
    const fDate = document.getElementById('footer-date');
    if (fDate) {
        const rawDate = new Date(WEDDING_CONFIG.weddingDate);
        const dateOpts = { month: 'long', day: 'numeric', year: 'numeric' };
        fDate.textContent = rawDate.toLocaleDateString("en-US", dateOpts);
    }

    const fHash = document.getElementById('footer-hashtag');
    if (fHash) fHash.textContent = WEDDING_CONFIG.hashtag;

    document.querySelectorAll('.hero-names').forEach(el => el.textContent = `${WEDDING_CONFIG.couple.bride.name} & ${WEDDING_CONFIG.couple.groom.name}`);
    document.querySelectorAll('.hero-names-footer').forEach(el => el.textContent = `${WEDDING_CONFIG.couple.bride.name} & ${WEDDING_CONFIG.couple.groom.name}`);
}

function initCountdown() {
    const target = new Date(WEDDING_CONFIG.weddingDate).getTime();

    function tick() {
        const now = Date.now();
        const diff = target - now;

        if (diff <= 0) {
            const c = document.getElementById('countdown');
            if (c) c.innerHTML = '<p class="countdown-done" style="font-size:2rem; font-family:var(--font-serif); margin-top:1rem;">🎉 We\'re Married! 🎉</p>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const dEl = document.getElementById('days');
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (dEl) dEl.textContent = String(days).padStart(3, '0');
        if (hEl) hEl.textContent = String(hours).padStart(2, '0');
        if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
        if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);
}

function initNavbar() {
    const nav = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));

    // Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const linksWrap = document.querySelector('.nav-links');
    if (hamburger && linksWrap) {
        hamburger.addEventListener('click', () => {
            const open = linksWrap.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', open);
        });
    }
}

function initScrollAnimations() {
    const animatedEls = document.querySelectorAll('.person-card, .contact-card');
    // timeline, events, gallery already have .animate-on-scroll injected

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    animatedEls.forEach(el => el.classList.add('animate-on-scroll'));

    // Observe all that have the class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const galleryItems = document.querySelectorAll('.gallery-item');

            galleryItems.forEach(item => {
                const match = filter === 'all' || item.dataset.category === filter;
                item.style.display = match ? 'block' : 'none';

                if (match) {
                    item.classList.remove('visible');
                    setTimeout(() => item.classList.add('visible'), 50);
                }
            });
        });
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');

    if (!lightbox) return;

    // Use event delegation for dynamically injected items
    document.getElementById('galleryGrid').addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay p');

        if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
        }
        lightboxCaption.textContent = caption ? caption.textContent : '';
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    });

    function closeLightbox() {
        lightbox.hidden = true;
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function initFloatingPetals() {
    const container = document.getElementById('petals');
    if (!container) return;
    const petalEmojis = ['🌸', '🌺', '🌼', '🌷', '✿'];

    function createPetal() {
        const p = document.createElement('div');
        p.classList.add('petal');
        p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        p.style.left = Math.random() * 100 + '%';
        p.style.top = '-20px';
        const dur = 8 + Math.random() * 10;
        p.style.animationDuration = dur + 's';
        p.style.animationDelay = Math.random() * 3 + 's';
        p.style.fontSize = (0.7 + Math.random() * 0.8) + 'rem';
        container.appendChild(p);
        setTimeout(() => p.remove(), (dur + 5) * 1000);
    }

    for (let i = 0; i < 15; i++) {
        setTimeout(createPetal, i * 400);
    }
    setInterval(createPetal, 1400);
}
