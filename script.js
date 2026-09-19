(() => {
  const whatsappNumber = '5511967895522';
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const siteHeader = document.querySelector('.site-header');

  const updateHeader = () => siteHeader?.classList.toggle('is-scrolled', window.scrollY > 400);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  menuToggle?.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  const arrowPaths = {
    '↗': 'M7 17 17 7M7 7h10v10',
    '→': 'M5 12h14M13 6l6 6-6 6',
    '←': 'M19 12H5m6 6-6-6 6-6',
    '↔': 'M8 3 4 7l4 4M4 7h16m-4 14 4-4-4-4m4 4H4',
  };
  document.querySelectorAll('.button-arrow, .text-link span, .slider-button, .comparison-handle span').forEach((element) => {
    const glyph = element.textContent.trim();
    const path = arrowPaths[glyph];
    if (!path) return;
    element.textContent = '';
    element.insertAdjacentHTML('beforeend', `<svg class="icon icon-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${path}" /></svg>`);
  });

  const comparison = document.querySelector('#comparison');
  const before = comparison?.querySelector('.smile-before');
  const handle = comparison?.querySelector('.comparison-handle');
  let dragging = false;
  const setComparison = (clientX) => {
    if (!comparison || !before || !handle) return;
    const box = comparison.getBoundingClientRect();
    const value = Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100));
    before.style.width = `${value}%`;
    comparison.style.setProperty('--comparison-position', `${value}%`);
    handle.style.left = `${value}%`;
    comparison.classList.toggle('is-before-focused', value <= 25);
    comparison.classList.toggle('is-after-focused', value >= 75);
    comparison.setAttribute('aria-valuenow', String(Math.round(value)));
    comparison.setAttribute('aria-valuetext', `${Math.round(value)}% antes`);
  };
  comparison?.addEventListener('pointerdown', (event) => { dragging = true; comparison.setPointerCapture(event.pointerId); setComparison(event.clientX); });
  comparison?.addEventListener('pointermove', (event) => { if (dragging) setComparison(event.clientX); });
  comparison?.addEventListener('pointerup', () => { dragging = false; });
  comparison?.addEventListener('pointercancel', () => { dragging = false; });
  comparison?.addEventListener('keydown', (event) => {
    const current = Number(comparison.getAttribute('aria-valuenow')) || 50;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const next = current + (event.key === 'ArrowRight' ? 5 : -5);
      const box = comparison.getBoundingClientRect();
      setComparison(box.left + (Math.min(100, Math.max(0, next)) / 100) * box.width);
    }
  });
  if (comparison) {
    const box = comparison.getBoundingClientRect();
    setComparison(box.left + box.width / 2);
  }

  const track = document.querySelector('.services-track');
  const progress = document.querySelector('#services-progress');
  const updateProgress = () => {
    if (!track || !progress) return;
    const max = track.scrollWidth - track.clientWidth;
    progress.style.width = `${max ? Math.max(20, (track.scrollLeft / max) * 80 + 20) : 100}%`;
  };
  track?.addEventListener('scroll', updateProgress, { passive: true });
  document.querySelector('#services-next')?.addEventListener('click', () => track?.scrollBy({ left: track.clientWidth * .78, behavior: 'smooth' }));
  document.querySelector('#services-prev')?.addEventListener('click', () => track?.scrollBy({ left: -track.clientWidth * .78, behavior: 'smooth' }));
  updateProgress();

  const form = document.querySelector('#booking-form');
  const status = document.querySelector('#form-status');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const interest = String(data.get('interest') || '').trim();
    const period = String(data.get('period') || '').trim();
    const message = `Olá! Meu nome é ${name}. Gostaria de conversar sobre ${interest.toLowerCase()}. Tenho preferência pelo período da ${period.toLowerCase()}. Vim pelo portfólio Denty.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    status.textContent = 'Abrindo o WhatsApp com sua mensagem…';
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  const initGsapAnimations = () => {
    if (!window.gsap || !window.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        desktop: '(min-width: 901px)',
      },
      (context) => {
        const { reduceMotion, desktop } = context.conditions;
        const sectionSelectors = [
          '.comparison-layout',
          '.services .section-heading',
          '.approach .section-heading',
          '.team .section-heading',
          '.booking-grid',
          '.site-footer .footer-grid',
        ];
        const revealEach = (selector, vars, triggerStart = 'top 88%') => {
          gsap.utils.toArray(selector).forEach((element) => {
            gsap.from(element, {
              ...vars,
              scrollTrigger: {
                trigger: element,
                start: triggerStart,
                once: true,
              },
            });
          });
        };

        if (reduceMotion) {
          gsap.set('.hero, .hero * , .comparison-layout, .service-card, .approach-card, .team-card, .booking-grid', {
            clearProps: 'all',
          });
          return;
        }

        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
        heroTimeline
          .from('.hero .eyebrow', { autoAlpha: 0, y: 18, duration: 0.55 })
          .from('.hero h1', { autoAlpha: 0, y: 34, duration: 0.8 }, '-=0.28')
          .from('.hero-lede, .hero-trust', { autoAlpha: 0, y: 20, duration: 0.65, stagger: 0.1 }, '-=0.42')
          .from('.hero-copy .button', { autoAlpha: 0, y: 18, scale: 0.96, duration: 0.6 }, '-=0.35')
          .from('.hero-visual', { autoAlpha: 0, x: 34, scale: 0.97, duration: 0.9 }, '-=0.8')
          .from('.hero-rating, .hero-note', { autoAlpha: 0, y: 16, duration: 0.55, stagger: 0.12 }, '-=0.45');

        gsap.to('.hero-photo img', {
          scale: 1.045,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to('.hero h1 em, .section-heading h2 em, .booking-copy h2 em', {
          textShadow: '0 0 18px rgba(7, 151, 225, 0.3)',
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        sectionSelectors.forEach((selector) => {
          gsap.from(selector, {
            autoAlpha: 0,
            y: 42,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: selector,
              start: 'top 82%',
              once: true,
            },
          });
        });

        revealEach('.service-card, .approach-card, .team-card', {
          autoAlpha: 0,
          y: 30,
          duration: 0.65,
          ease: 'power2.out',
        });

        gsap.from('.comparison-copy > *, .booking-copy > *, .booking-points li', {
          autoAlpha: 0,
          x: -24,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.comparison-layout, .booking-grid',
            start: 'top 82%',
            once: true,
          },
        });

        if (desktop) {
          gsap.utils.toArray('.approach-image img, .team-card img, .service-card img').forEach((image) => {
            gsap.to(image, {
              yPercent: -5,
              ease: 'none',
              scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            });
          });
        }

        gsap.utils.toArray('.button, .slider-button, .text-link').forEach((element) => {
          if (element.dataset.gsapBound) return;
          element.dataset.gsapBound = 'true';
          const arrow = element.querySelector('.button-arrow, .icon-arrow');
          element.addEventListener('mouseenter', () => {
            gsap.to(element, { y: -3, duration: 0.22, ease: 'power2.out', overwrite: true });
            if (arrow) gsap.to(arrow, { x: 3, rotation: 4, duration: 0.22, overwrite: true });
          });
          element.addEventListener('mouseleave', () => {
            gsap.to(element, { y: 0, duration: 0.28, ease: 'power2.out', overwrite: true });
            if (arrow) gsap.to(arrow, { x: 0, rotation: 0, duration: 0.28, overwrite: true });
          });
        });

        ScrollTrigger.refresh();
      },
    );
  };

  initGsapAnimations();
})();

