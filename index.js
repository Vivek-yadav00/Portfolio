/* ============================================
   INTERACTIONS — Vivek Yadav Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    } else {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
    localStorage.setItem('portfolio-theme', theme);
  }

  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });


  // ---- Reveal on Scroll ----
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Typing Effect ----
  const typingEl = document.getElementById('typing-text');
  const phrases = [
    'AI/ML Enthusiast',
    'Aspiring Data Scientist',
    'DSA Enthusiast — 330+ Problems',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIdx === current.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // ---- Animated stat counters ----
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNumbers.forEach((n) => statObserver.observe(n));

  function animateCounter(el, target) {
    let count = 0;
    const duration = 1500;
    const increment = target / (duration / 30);

    function tick() {
      count += increment;
      if (count >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.floor(count);
      requestAnimationFrame(tick);
    }
    tick();
  }

  // ---- Project Category Filter ----
  const projectFilters = document.querySelectorAll('#project-filters .filter-tab');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  projectFilters.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Update active tab
      projectFilters.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      projectCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---- Skills Category Filter ----
  const skillFilters = document.querySelectorAll('#skill-filters .filter-tab');
  const skillCategories = document.querySelectorAll('#skills-grid .skill-category');

  skillFilters.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillFilters.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      skillCategories.forEach((cat) => {
        if (filter === 'all' || cat.dataset.skillCategory === filter) {
          cat.classList.remove('hidden');
        } else {
          cat.classList.add('hidden');
        }
      });
    });
  });

  // ---- Project Detail Modal ----
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalStatus = document.getElementById('modal-status');
  const modalFeatured = document.getElementById('modal-featured');
  const modalTechCount = document.getElementById('modal-tech-count');
  const modalDescription = document.getElementById('modal-description');
  const modalTags = document.getElementById('modal-tags');
  const modalGithub = document.getElementById('modal-github');
  const modalDemo = document.getElementById('modal-demo');

  document.querySelectorAll('.btn-view-details').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      if (!card) return;

      // Extract data from the card
      const title = card.querySelector('.project-name')?.textContent || 'Project';
      const desc = card.querySelector('.project-desc')?.textContent || '';
      const status = card.querySelector('.project-status')?.textContent || 'completed';
      const tags = card.querySelectorAll('.tag');
      const githubLink = card.querySelector('.project-overlay a[aria-label="View code"]')?.href || '#';
      const demoLink = card.querySelector('.project-overlay a[aria-label="Live demo"]')?.href || '#';

      // Populate modal
      modalTitle.textContent = title;
      modalStatus.textContent = status;
      modalStatus.className = 'project-status status-' + status.replace(/\s+/g, '-');
      modalFeatured.textContent = 'Featured';
      modalTechCount.textContent = tags.length;
      modalDescription.textContent = desc || 'No description available.';

      // Build tags
      modalTags.innerHTML = '';
      tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag.textContent;
        modalTags.appendChild(span);
      });

      const githubAnchor = card.querySelector('.project-overlay a[aria-label="View code"]');
      if (githubAnchor) {
        modalGithub.style.display = '';
        modalGithub.href = githubLink;
      } else {
        modalGithub.style.display = 'none';
      }
      
      const liveDemoAnchor = card.querySelector('.project-overlay a[aria-label="Live demo"]');
      if (liveDemoAnchor) {
        modalDemo.style.display = '';
        modalDemo.href = demoLink;
      } else {
        modalDemo.style.display = 'none';
      }

      // Show modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // ---- Soft Skill Progress Bars ----
  const softBars = document.querySelectorAll('.soft-skill-bar');
  const softBarObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          softBarObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  softBars.forEach((bar) => softBarObserver.observe(bar));

  // ---- Contact form validation ----
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      statusEl.textContent = 'Please fill in all fields.';
      statusEl.className = 'form-status error';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      statusEl.textContent = 'Please enter a valid email address.';
      statusEl.className = 'form-status error';
      return;
    }

    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending...';

    setTimeout(() => {
      statusEl.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      statusEl.className = 'form-status success';
      form.reset();
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Send Message';

      setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
      }, 5000);
    }, 1200);
  });

  // ---- Smooth scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
