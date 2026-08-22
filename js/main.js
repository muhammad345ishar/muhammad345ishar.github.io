/* ═══════════════════════════════════════════════════════════════════════
   Reveal on enter, drift-and-fade on exit, scroll-linked hero.
   Rebuilt from the reference recording: lines are masked and staggered,
   never split per character — per-line keeps each heading one readable
   node for assistive tech.
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ── reveal / exit ───────────────────────────────────────────────── */
  const animated = $$('.sec-head, .hero-kicker, [data-rise], .hero-name');

  if (reduced) {
    animated.forEach(el => el.classList.add('in'));
  } else {
    // Two thresholds, because "far enough in to reveal" and "gone" are
    // different questions. Asking one threshold to answer both either resets
    // a block while a strip of it is still on screen, or never resets it at
    // all — IntersectionObserver reports threshold crossings, not positions,
    // so a condition that only becomes true after the last crossing is never
    // seen. No bottom rootMargin either: REVEAL already holds the reveal back,
    // and shrinking the root moves ratio 0 above the real viewport edge.
    const REVEAL = 0.15;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const el = e.target;
        const r = e.boundingClientRect;

        // enough of it is inside the viewport -> reveal
        if (e.intersectionRatio >= REVEAL) {
          el.classList.remove('out');
          el.classList.add('in');
          return;
        }

        // its top has passed above the viewport -> play the exit
        if (r.top < 0) {
          if (el.classList.contains('in')) el.classList.add('out');
          return;
        }

        // fully below the fold -> reset, so the reveal can replay on the way
        // back down. Gated on ratio 0 rather than REVEAL: at 0.14 there is
        // still a strip of the block visible, and [data-rise] blocks have no
        // `.out` styling, so resetting one there is a hard snap to invisible.
        if (e.intersectionRatio <= 0) el.classList.remove('in', 'out');
      });
    }, { threshold: [0, REVEAL] });

    animated.forEach(el => io.observe(el));
  }

  /* ── hero: fade and lift as it scrolls away ──────────────────────── */
  const hero = $('.hero');
  if (hero && !reduced) {
    let queued = false;
    const write = () => {
      queued = false;
      const span = hero.offsetHeight * 0.82;
      const p = Math.min(Math.max(window.scrollY / span, 0), 1);
      hero.style.setProperty('--p', p.toFixed(4));
    };
    addEventListener('scroll', () => {
      if (!queued) { queued = true; requestAnimationFrame(write); }
    }, { passive: true });
    write();
  }

  /* ── nav: current section ────────────────────────────────────────── */
  const links = $$('.nav nav a');
  const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const sections = $$('main section').filter(s => byId.has(s.id));

  if (sections.length) {
    let active = null;
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const a = byId.get(e.target.id);
        if (!a || a === active) return;
        if (active) active.classList.remove('current');
        a.classList.add('current');
        active = a;
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => navIO.observe(s));
  }

  /* ── mobile nav ──────────────────────────────────────────────────── */
  const nav = $('#nav');
  const toggle = $('#navToggle');

  if (nav && toggle) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    links.forEach(a => a.addEventListener('click', () => setOpen(false)));
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
    addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target)) setOpen(false);
    });
  }
})();
