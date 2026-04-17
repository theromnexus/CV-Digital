/**
 * Bolera Center Strike - Main JavaScript
 * Interactividad del sitio web
 */

document.addEventListener('DOMContentLoaded', () => {

  const MOBILE_BREAKPOINT = 900;

  // =====================
  // NAVBAR
  // =====================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const backToTopBtn = document.getElementById('backToTop');

  function closeMenu() {
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (navMenu) {
      navMenu.classList.remove('active');
    }
    if (navOverlay) {
      navOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  // Hamburger toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      if (navOverlay) {
        navOverlay.classList.toggle('active');
      }
      hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active') ? 'true' : 'false');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Close menu on overlay click
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close menu on link click
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        closeMenu();
      }
    });
  });

  // Navbar scroll effect
  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', window.scrollY > 500);
    }
  }
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // Mobile dropdown toggle
  document.querySelectorAll('.has-dropdown').forEach(item => {
    const link = item.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  // =====================
  // SCROLL ANIMATIONS
  // =====================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // =====================
  // SMOOTH SCROLL (anchors)
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (navLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', isActive);
        });
      });
    }, {
      threshold: 0.35,
      rootMargin: '-20% 0px -55% 0px'
    });

    navLinks.forEach(link => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        sectionObserver.observe(target);
      }
    });
  }

  // =====================
  // SET MIN DATE on date inputs
  // =====================
  document.querySelectorAll('input[type="date"]').forEach(input => {
    const today = new Date().toISOString().split('T')[0];
    input.setAttribute('min', today);
  });

  // =====================
  // PROJECT FILTERS
  // =====================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter || 'all';

        filterButtons.forEach(item => item.classList.remove('active'));
        button.classList.add('active');

        projectCards.forEach(card => {
          const categories = (card.dataset.category || '').split(' ');
          const shouldShow = filter === 'all' || categories.includes(filter);
          card.classList.toggle('is-hidden', !shouldShow);
        });
      });
    });
  }

  // =====================
  // EXPERIENCE ACCORDION
  // =====================
  const timelineToggles = document.querySelectorAll('.timeline-toggle');

  timelineToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parent = toggle.closest('.timeline-card');
      const detail = parent ? parent.querySelector('.timeline-detail') : null;
      if (!detail) {
        return;
      }

      const isOpen = !detail.hasAttribute('hidden');
      detail.toggleAttribute('hidden', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      toggle.textContent = isOpen ? 'Ver detalle' : 'Ocultar detalle';
    });
  });

  // =====================
  // BACK TO TOP
  // =====================
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

// =====================
// EMAILJS — CONFIGURACIÓN
// 1. Regístrate en https://www.emailjs.com/
// 2. Conecta tu cuenta Gmail (theromnexus@gmail.com) como servicio.
// 3. Crea una plantilla con los campos: {{nombre}}, {{email}}, {{mensaje}}.
//    Asegúrate de que «To Email» sea theromnexus@gmail.com.
// 4. Sustituye los tres valores de abajo con los de tu dashboard.
// =====================
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ej: 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ej: 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ej: 'abcDEF_123456'

// =====================
// FORM HANDLERS
// =====================

function handleContactForm(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  const btn     = form ? form.querySelector('[type="submit"]') : null;

  if (!form || !success) return false;

  if (btn) {
    btn.disabled    = true;
    btn.textContent = 'Enviando…';
  }

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
    publicKey: EMAILJS_PUBLIC_KEY,
  }).then(() => {
    form.style.display = 'none';
    success.classList.add('visible');
  }).catch((err) => {
    console.error('EmailJS error:', err);
    if (btn) {
      btn.disabled    = false;
      btn.textContent = 'Enviar mensaje';
    }
    alert('No se pudo enviar el mensaje. Por favor, inténtalo de nuevo o contáctame directamente por email.');
  });

  return false;
}

function handleReservaForm(e) {
  e.preventDefault();
  const form = document.getElementById('reservaForm');
  const success = document.getElementById('reservaSuccess');
  if (form && success) {
    form.style.display = 'none';
    success.style.display = 'block';
  }
  return false;
}

function handleCumpleForm(e) {
  e.preventDefault();
  const form = document.getElementById('cumpleForm');
  const success = document.getElementById('cumpleSuccess');
  if (form && success) {
    form.style.display = 'none';
    success.style.display = 'block';
  }
  return false;
}
