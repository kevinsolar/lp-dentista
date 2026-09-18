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
})();

