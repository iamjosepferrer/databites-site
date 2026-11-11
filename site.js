// Shared behaviour for every page of databites.tech.
// ─── SETTINGS: the only two values you need to fill in ───────────────
const BOOKING_URL = 'https://cal.com/iamjosepferrer/20min';   // your booking page, e.g. 'https://cal.com/your-name/intro'
const FORM_KEY = '7e6ca9e0-af3d-437c-bc7e-644cd99430bc';      // your Web3Forms access key (sent to you by email)
// Audience numbers shown across the site. Change them here only.
const AUDIENCE = { linkedin: '10k', x: '26k', newsletter: '10k' };
// ─────────────────────────────────────────────────────────────────────

(function () {
  const L = {
    en: { work: 'Work with me', portfolio: 'Portfolio', writing: 'Writing', learn: 'Learn', newsletter: 'Newsletter', contact: 'Get in touch', book: 'Book a call', copy: 'Copy', copied: 'Copied' },
    es: { work: 'Trabaja conmigo', portfolio: 'Portfolio', writing: 'Escritura', learn: 'Learn', newsletter: 'Newsletter', contact: 'Contacta', book: 'Reserva una llamada', copy: 'Copiar', copied: 'Copiado' },
    ca: { work: 'Treballa amb mi', portfolio: 'Portfolio', writing: 'Escriptura', learn: 'Learn', newsletter: 'Newsletter', contact: 'Contacta', book: 'Reserva una trucada', copy: 'Copiar', copied: 'Copiat' }
  };
  let lang = 'en';
  function track(name, data) { if (window.umami) window.umami.track(name, data || {}); }

  function renderChrome(l) {
    lang = L[l] ? l : 'en';
    document.querySelectorAll('[data-nav]').forEach(el => { el.textContent = L[lang][el.dataset.nav]; });
    document.querySelectorAll('.copy-btn').forEach(b => { b.textContent = L[lang].copy; });
  }

  // Booking: with a booking link, every "book a call" button and sentence shows and opens it.
  // Without one, they stay hidden so nobody is promised a call they cannot book.
  function applyBooking() {
    document.querySelectorAll('[data-book-only]').forEach(el => { el.hidden = !BOOKING_URL; });
    document.querySelectorAll('.js-book').forEach(a => {
      if (BOOKING_URL) { a.href = BOOKING_URL; a.target = '_blank'; a.rel = 'noopener'; }
    });
  }
  applyBooking();

  // Phone menu
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-menu a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // Copy email
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      const done = () => { btn.textContent = L[lang].copied; setTimeout(() => { btn.textContent = L[lang].copy; }, 1600); };
      try { navigator.clipboard.writeText(text).then(done, () => {}); } catch (e) {}
      track('email-copy', { location: location.pathname });
    });
  });

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const msg = k => form.dataset[k + (lang === 'en' ? '' : lang.charAt(0).toUpperCase() + lang.slice(1))] || form.dataset[k];
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form).entries());
      if (d.botcheck) return;
      if (!FORM_KEY) {
        const body = `[${d.topic || ''}]\n${d.message}\n\n${d.name}\n${d.organisation || ''}\n${d.email}`;
        location.href = 'mailto:josep@databites.tech?subject=' + encodeURIComponent('Working together') + '&body=' + encodeURIComponent(body);
        return;
      }
      const btn = form.querySelector('button'); btn.disabled = true;
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: FORM_KEY, subject: 'databites.tech: new enquiry', from_name: d.name, ...d })
        });
        const out = await res.json();
        if (!out.success) throw new Error(out.message || 'failed');
        form.reset(); status.textContent = msg('ok'); track('form-submit', { location: location.pathname });
      } catch (err) { status.textContent = msg('err'); }
      btn.disabled = false;
    });
  }

  function renderAudience() {
    document.querySelectorAll('[data-audience]').forEach(function (el) {
      const v = AUDIENCE[el.getAttribute('data-audience')]; if (v) el.textContent = v;
    });
  }

  // Follow the page's language switch
  const pageSetLang = window.setLang;
  if (typeof pageSetLang === 'function') {
    window.setLang = function (l) { pageSetLang(l); renderChrome(l); renderAudience(); applyBooking(); };
  }
  let saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
  const b = (navigator.language || 'en').slice(0, 2).toLowerCase();
  renderChrome(saved || (b === 'es' ? 'es' : b === 'ca' ? 'ca' : 'en'));
  renderAudience();
})();
