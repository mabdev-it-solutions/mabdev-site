/**
 * Mabdev IT Solutions - Premium Interactive JavaScript
 * Handles animations, interactions, custom cursor, and effects
 */

(function() {
  'use strict';

  // =========================================
  // Custom Cursor
  // =========================================
  function initCustomCursor() {
    // Only on desktop with fine pointer
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
      dotX += (cursorX - dotX) * 0.2;
      dotY += (cursorY - dotY) * 0.2;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .service-card, .project-card, .tech-category, input, textarea');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
      target.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
  }

  // =========================================
  // Navigation
  // =========================================
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Navbar scroll effect
  let lastScroll = 0;
  let ticking = false;

  function updateNav() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  });

  // =========================================
  // Smooth scroll for anchor links
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // =========================================
  // Intersection Observer for animations
  // =========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // =========================================
  // Mouse-tracking glow effect for cards
  // =========================================
  function initCardGlow() {
    const cards = document.querySelectorAll('.service-card, .project-card, .tech-category');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // =========================================
  // Magnetic button effect
  // =========================================
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn--primary');

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // =========================================
  // Parallax effects
  // =========================================
  function initParallax() {
    const hero = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.hero__orb');
    const heroContent = document.querySelector('.hero__content');

    if (!hero || !orbs.length) return;

    let scrollY = 0;
    let rafId = null;

    function updateParallax() {
      scrollY = window.pageYOffset;

      // Parallax for orbs
      orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });

      // Fade out hero content on scroll
      if (heroContent) {
        const opacity = Math.max(0, 1 - (scrollY / 500));
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      }

      rafId = null;
    }

    window.addEventListener('scroll', () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateParallax);
      }
    });
  }

  // =========================================
  // Text scramble effect
  // =========================================
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;

      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="scramble-char">${char}</span>`;
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;

      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // =========================================
  // Counter animation
  // =========================================
  function animateCounters() {
    const counters = document.querySelectorAll('.hero__stat-value, .about__stat-value');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const text = counter.textContent;
          const match = text.match(/(\d+)/);

          if (match) {
            const target = parseInt(match[0]);
            const prefix = text.substring(0, text.indexOf(match[0]));
            const suffix = text.substring(text.indexOf(match[0]) + match[0].length);
            let current = 0;
            const duration = 2000;
            const step = target / (duration / 16);

            function updateCounter() {
              current += step;
              if (current < target) {
                counter.innerHTML = prefix + '<span>' + Math.floor(current) + '</span>' + suffix;
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerHTML = prefix + '<span>' + target + '</span>' + suffix;
              }
            }

            updateCounter();
          }

          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // =========================================
  // Typing effect for hero
  // =========================================
  function initTypingEffect() {
    const gradientText = document.querySelector('.hero__headline-gradient');
    if (!gradientText) return;

    const words = ['Digital Solutions', 'Web Development', 'Cloud Architecture', 'Innovation'];
    let wordIndex = 0;

    // Only enable if user prefers motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Use text scramble instead of typing
    const fx = new TextScramble(gradientText);

    function cycleWords() {
      fx.setText(words[wordIndex]).then(() => {
        setTimeout(() => {
          wordIndex = (wordIndex + 1) % words.length;
          cycleWords();
        }, 3000);
      });
    }

    // Start after initial animation
    setTimeout(cycleWords, 4000);
  }

  // =========================================
  // Active nav link on scroll
  // =========================================
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);

  // =========================================
  // Tilt effect for cards
  // =========================================
  function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // =========================================
  // Initialize animations on page load
  // =========================================
  window.addEventListener('load', () => {
    // Remove loading class
    document.body.classList.remove('loading');

    // Initialize all effects
    initCustomCursor();
    initCardGlow();
    initMagneticButtons();
    initParallax();
    initTiltEffect();
    animateCounters();
    // initTypingEffect(); // Uncomment if you want text cycling

    // Add stagger classes to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
      card.classList.add('fade-in', `stagger-${(index % 6) + 1}`);
      observer.observe(card);
    });

    // Add stagger classes to tech categories
    document.querySelectorAll('.tech-category').forEach((cat, index) => {
      cat.classList.add('fade-in', `stagger-${(index % 4) + 1}`);
      observer.observe(cat);
    });

    // Add stagger classes to project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
      card.classList.add('fade-in', `stagger-${(index % 3) + 1}`);
      observer.observe(card);
    });

    // Add fade-in to section headers
    document.querySelectorAll('.section__header').forEach(header => {
      header.classList.add('fade-in');
      observer.observe(header);
    });

    // Add fade-in to about content
    document.querySelectorAll('.about__image-wrapper, .about__text').forEach((el, index) => {
      el.classList.add('fade-in', `stagger-${index + 1}`);
      observer.observe(el);
    });

    // Hero animations (immediate with stagger)
    const heroElements = document.querySelectorAll('.hero__badge, .hero__headline, .hero__description, .hero__cta, .hero__stats');
    heroElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + (index * 150));
    });

    // Animate scroll indicator
    const scrollIndicator = document.querySelector('.hero__scroll');
    if (scrollIndicator) {
      setTimeout(() => {
        scrollIndicator.style.opacity = '1';
      }, 1500);
    }
  });

  // =========================================
  // Reveal animations on scroll
  // =========================================
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.text-reveal');

    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (revealTop < windowHeight - 100) {
        reveal.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);

  // =========================================
  // Prevent flash of unstyled content
  // =========================================
  document.documentElement.classList.add('js-loaded');

  // =========================================
  // Performance: Debounce resize events
  // =========================================
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Recalculate any size-dependent values
    }, 250);
  });

})();
