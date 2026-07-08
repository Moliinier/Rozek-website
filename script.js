// ============================================================
//  ROZEK — Interactividad principal
// ============================================================

// ── Navbar scroll ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile menu ──────────────────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ── FAQ accordion ────────────────────────────────────────────
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('open');

    // Cierra todos
    document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));

    // Abre el actual si estaba cerrado
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

// ── Animación de entrada con IntersectionObserver ────────────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Añade clase de animación a elementos
const animatedElements = document.querySelectorAll(
  '.feature-card, .pricing-card, .testimonial-card, .how__step, .faq__item'
);

animatedElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  observer.observe(el);
});

// Clase visible
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);

// ── Chat demo: simula respuesta de Rozek ────────────────────
let chatAnimated = false;

const chatObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !chatAnimated) {
      chatAnimated = true;
      simulateChatResponse();
    }
  });
}, { threshold: 0.5 });

const chatDemo = document.querySelector('.chat-demo');
if (chatDemo) chatObserver.observe(chatDemo);

function simulateChatResponse() {
  const typingMsg = document.querySelector('.typing');
  if (!typingMsg) return;

  setTimeout(() => {
    const response = `Excelente enfoque. Una app de salud mental para jóvenes tiene un mercado enorme y creciente. Aquí está la estructura base de tu plan:

<strong>Resumen ejecutivo</strong> — Misión, visión y propuesta de valor única.<br>
<strong>Análisis de mercado</strong> — 1 de cada 5 jóvenes enfrenta problemas de salud mental; mercado global de $383B para 2030.<br>
<strong>Modelo de negocio</strong> — Freemium con suscripción premium a $9.99/mes.`;

    typingMsg.classList.remove('typing');
    const bubble = typingMsg.querySelector('.chat-msg__bubble');
    bubble.innerHTML = response;
    bubble.style.opacity = '0';
    bubble.style.transition = 'opacity 0.4s ease';

    requestAnimationFrame(() => {
      bubble.style.opacity = '1';
    });
  }, 2500);
}

// ── Smooth scroll para links de nav ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
