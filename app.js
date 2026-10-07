// Project facts come from the supplied CV. Add verified repository URLs here
// later; missing links are intentionally not replaced with guessed profiles.
const projects = {
  aether: {
    title: 'Aether Chess', category: 'Systems engineering · C++17', image: 'aether', color: '#e7e3f3',
    description: 'A UCI-compliant chess engine built in C++17, with a handcrafted evaluator and a negamax / Principal Variation Search (PVS) search.',
    details: ['Implements the Universal Chess Interface (UCI) protocol for communicating with compatible chess interfaces.', 'Validated using CTest, AddressSanitizer, and UndefinedBehaviorSanitizer.', 'Move generation checked through differential perft against python-chess.', 'Continuous integration on GitHub Actions for both Linux and macOS.'],
    tags: ['C++17', 'UCI', 'Negamax / PVS', 'CTest', 'ASan / UBSan', 'GitHub Actions']
  },
  oweek: {
    title: 'O-Week Token Board', category: 'Web application · Campus deployment', image: 'queue', color: '#e1e9c8',
    description: 'A LAN-based application for live registration queue management, deployed campus-wide during PIEAS O-Week 2026.',
    details: ['Built with a Node.js / Express backend and a React interface.', 'Designed to operate over the local area network for registration queue management.', 'Used during campus-wide orientation in 2026.'],
    tags: ['Node.js', 'Express', 'React', 'LAN', 'O-Week 2026']
  },
  ltspice: {
    title: 'LTspice Automation', category: 'Developer tool · Circuit automation', image: 'spice', color: '#f0e5d4',
    description: 'A Python tool and agent skill for reading, editing, and simulating LTspice circuit files.',
    details: ['Uses the Python standard library only.', 'Brings circuit file reading, editing, and simulation into a programmable workflow.', 'Open-sourced with an extensive validation corpus.'],
    tags: ['Python', 'Standard library', 'LTspice', 'Agent skill', 'Open source']
  },
  arena: {
    title: 'Chess Engine Arena', category: 'Web interface · Chess tooling', image: 'arena', color: '#d3e5e2',
    description: 'A companion Node.js graphical interface for running UCI chess engines against each other.',
    details: ['Runs UCI-compatible chess engines head to head.', 'Provides live evaluation while games are in progress.', 'Complements the Aether Chess engine project.'],
    tags: ['Node.js', 'UCI', 'Chess', 'Live evaluation']
  },
  whatsapp: {
    title: 'WhatsApp Auto-Reply', category: 'Automation · Python', image: 'bot', color: '#e4e9f9',
    description: 'A Python automation project using the Groq API for contextual WhatsApp auto-replies and urgent-message alerts.',
    details: ['Uses message context to generate automated replies with the Groq API.', 'Includes alerts for urgent messages.', 'Explores practical communication automation with Python.'],
    tags: ['Python', 'Groq API', 'WhatsApp', 'Automation']
  },
  rpg: {
    title: 'An RPG, now on macOS', category: 'Cross-platform development · C++', image: 'rpg', color: '#f0dcd2',
    description: 'A port of a Windows-only C++ role-playing game to macOS.',
    details: ['Replaced Windows-specific platform dependencies with POSIX equivalents.', 'Adapted the existing C++ game for the macOS environment.'],
    tags: ['C++', 'macOS', 'POSIX', 'Porting']
  }
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = isOpen;
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 701px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

// Keep filters as real buttons, with a screen-reader announcement of results.
const cards = [...document.querySelectorAll('.project-card')];
document.querySelectorAll('.filter').forEach(filter => {
  filter.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(button => {
      const active = button === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    cards.forEach(card => {
      const visible = filter.dataset.filter === 'all' || card.dataset.category === filter.dataset.filter;
      card.hidden = !visible;
      card.classList.remove('filter-enter');
      if (visible) {
        count += 1;
        if (!reducedMotion.matches) {
          requestAnimationFrame(() => card.classList.add('filter-enter'));
        }
      }
    });
    document.querySelector('#filter-status').textContent = `Showing ${count} projects.`;
  });
});

// Native <dialog> isolates the modal and handles Escape. Explicit Tab wrapping
// also keeps keyboard focus inside the panel instead of jumping to browser UI.
// textContent keeps project facts separate from markup.
const dialog = document.querySelector('#project-dialog');
let dialogTrigger;
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...dialog.querySelectorAll('button:not([disabled]), a[href]')];
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    dialogTrigger = button;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-category').textContent = project.category;
    document.querySelector('#dialog-description').textContent = project.description;
    document.querySelector('#dialog-image').src = `assets/project-${project.image}.svg`;
    document.querySelector('.dialog-art').style.background = project.color;
    const details = project.details.map(detail => {
      const li = document.createElement('li');
      li.textContent = detail;
      return li;
    });
    document.querySelector('#dialog-details').replaceChildren(...details);
    document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(tag => {
      const span = document.createElement('span');
      span.textContent = tag;
      return span;
    }));
    document.querySelector('.dialog-cta').href = `mailto:m_ishar@icloud.com?subject=${encodeURIComponent(`Let's talk about ${project.title}`)}`;
    dialog.showModal();
    dialog.scrollTop = 0;
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
let pointerStartedOutside = false;
dialog.addEventListener('pointerdown', event => { pointerStartedOutside = event.target === dialog && outsideDialog(event); });
dialog.addEventListener('click', event => {
  if (pointerStartedOutside && event.target === dialog && outsideDialog(event)) dialog.close();
  pointerStartedOutside = false;
});
function outsideDialog(event) {
  const rect = dialog.getBoundingClientRect();
  return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
}
dialog.addEventListener('close', () => dialogTrigger?.focus({ preventScroll: true }));

let toastTimer;
function notify(message) {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3400);
}
document.querySelector('.copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('m_ishar@icloud.com');
    notify('Email copied. A hello is a good place to start.');
  } catch {
    notify('You can copy this address: m_ishar@icloud.com');
  }
});

// A small, optional delight. Nothing loops, and reduced-motion users get the
// same message without any particles. Debouncing bounds repeated-click work.
let lastSpark = 0;
document.querySelector('.spark-button').addEventListener('click', event => {
  if (Date.now() - lastSpark < 1000) return;
  lastSpark = Date.now();
  notify('A little spark goes a long way.');
  if (reducedMotion.matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const colors = ['#d8ed83', '#f8f7f0', '#e7b5f3', '#ffc599'];
  for (let i = 0; i < 22; i++) {
    const particle = document.createElement('span');
    particle.className = 'confetti';
    particle.style.background = colors[i % colors.length];
    particle.style.left = `${rect.left + rect.width / 2}px`;
    particle.style.top = `${rect.top + rect.height / 2}px`;
    document.body.append(particle);
    const angle = Math.random() * Math.PI * 2;
    const distance = 55 + Math.random() * 145;
    const animation = particle.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance + 45}px) rotate(${Math.random() * 500}deg)`, opacity: 0 }
    ], { duration: 650 + Math.random() * 450, easing: 'cubic-bezier(.15,.65,.4,1)' });
    animation.onfinish = () => particle.remove();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
