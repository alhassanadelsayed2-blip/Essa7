document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var navlinks = document.querySelector('.navlinks');
  if (toggle && navlinks) {
    toggle.addEventListener('click', function () {
      navlinks.classList.toggle('open');
      var isOpen = navlinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navlinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navlinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active link highlight on scroll ---------- */
  var sections = document.querySelectorAll('section[id], header[id]');
  var navAnchors = document.querySelectorAll('.navlinks a');

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var currentId = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.getAttribute('id');
      }
    });
    navAnchors.forEach(function (a) {
      var href = a.getAttribute('href').replace('#', '');
      a.classList.toggle('active', href === currentId);
    });
  }

  /* ---------- Back to top button ---------- */
  var toTop = document.querySelector('.to-top');
  function toggleToTop() {
    if (!toTop) return;
    if (window.scrollY > 500) {
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  }
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', function () {
    setActiveLink();
    toggleToTop();
  }, { passive: true });

  setActiveLink();
  toggleToTop();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Screenshot lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.querySelector('.lightbox-close');
  var shotImgs = document.querySelectorAll('.shot img');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
  }

  shotImgs.forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- Current year in footer ---------- */
  var yearEl = document.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
