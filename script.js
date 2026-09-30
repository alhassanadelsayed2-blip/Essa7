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

  /* ---------- Project details modal ---------- */
  var projectModal = document.getElementById('projectModal');
  var projectCards = document.querySelectorAll('.project-card');
  var modalTitle = document.getElementById('projectModalTitle');
  var modalKicker = document.getElementById('projectModalKicker');
  var modalDescription = document.getElementById('projectModalDescription');
  var modalOverview = document.getElementById('projectModalOverview');
  var modalKpis = document.getElementById('projectModalKpis');
  var modalGallery = document.getElementById('projectModalGallery');
  var modalNumber = document.getElementById('projectModalNumber');

  var projects = {
    blaban: {
      number:'01',
      kicker:'Featured Case Study · Business Intelligence',
      title:'B.Laban Analytics',
      description:'A 360° business intelligence experience built around sales, profitability, products, branches, customers and promotions.',
      overview:'The project brings the core B.Laban business into one analytical experience. The dashboard moves from an executive overview into sales and profitability analysis, with product, branch, customer and promotion perspectives designed to help identify performance patterns and business opportunities.',
      kpis:[['EGP 10.1M','Revenue'],['40.0K','Orders'],['56.3%','Profit Margin'],['EGP 5.8M','Gross Profit']],
      gallery:[
        ['images/projects/blaban-home.png','Executive home — Taste. Data. Growth.'],
        ['images/projects/blaban-sales.png','Sales & profitability analysis'],
        ['images/projects/blaban-executive.png','Executive overview — revenue, regions, categories and key insights']
      ]
    },
    techcorp: {
      number:'02',
      kicker:'Business Intelligence · Enterprise Analytics',
      title:'TechCorp — Business Intelligence',
      description:'An enterprise BI dashboard connecting workforce, projects, tasks, budgets and performance into a single decision layer.',
      overview:'The TechCorp project organizes business activity across four views: Home, Executive Summary, Project Portfolio and HR & Performance. The screenshots show workforce allocation and risk, task status, project budget variance, completion, employee performance and portfolio-level KPIs.',
      kpis:[['30','Employees'],['25','Active Employees'],['$69.5K','Avg Salary'],['3.67 / 5.0','Performance Score']],
      gallery:[
        ['images/projects/techcorp-home.png','TechCorp landing screen — enterprise BI navigation'],
        ['images/projects/techcorp-tasks.png','Task insights — status, priority, hours and overdue work'],
        ['images/projects/techcorp-executive.png','Executive summary — projects, budget, cost and completion'],
        ['images/projects/techcorp-portfolio.png','Project portfolio — budget variance, status and actual cost'],
        ['images/projects/techcorp-hr.png','HR & Performance — workforce allocation and overload risk']
      ]
    },
    uber: {
      number:'03',
      kicker:'Analytics Dashboard · Ride-Hailing',
      title:'Uber — Rider Behavior & Booking Analysis',
      description:'A dashboard for understanding bookings, completion, vehicle demand, revenue and pickup-location patterns.',
      overview:'The Uber dashboard is structured around Home, Overview, Vehicle, Rider, Revenue and Location analysis. The visuals track booking volume and value, completion status, vehicle demand by month and top pickup locations, giving a connected view of rider and operational behavior.',
      kpis:[['149K','Total Bookings'],['93K','Completed Rides'],['52M','Booking Value'],['62.51%','Completion Rate']],
      gallery:[
        ['images/projects/uber-home.png','Home — dashboard navigation and headline KPIs'],
        ['images/projects/uber-overview.png','Overview — booking status, trend, vehicle type and pickup locations'],
        ['images/projects/uber-vehicle-demand.png','Vehicle demand by month and vehicle type']
      ]
    }
  };

  function renderProject(projectId){
    var p = projects[projectId];
    if (!p || !projectModal) return;
    modalNumber.textContent = p.number;
    modalKicker.textContent = p.kicker;
    modalTitle.textContent = p.title;
    modalDescription.textContent = p.description;
    modalOverview.textContent = p.overview;
    modalKpis.innerHTML = p.kpis.map(function(k){
      return '<div class="dialog-kpi"><div class="v">'+k[0]+'</div><div class="l">'+k[1]+'</div></div>';
    }).join('');
    modalGallery.innerHTML = p.gallery.map(function(item){
      return '<figure class="dialog-shot"><img src="'+item[0]+'" alt="'+item[1]+'"><figcaption>'+item[1]+'</figcaption></figure>';
    }).join('');
    modalGallery.querySelectorAll('img').forEach(function(img){
      img.addEventListener('click', function(){ openLightbox(img.src, img.alt); });
    });
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    var dialog = projectModal.querySelector('.project-dialog');
    if(dialog) dialog.scrollTop = 0;
  }

  function closeProjectModal(){
    if(!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }

  projectCards.forEach(function(card){
    card.addEventListener('click', function(){ renderProject(card.getAttribute('data-project')); });
  });
  if(projectModal){
    projectModal.querySelectorAll('[data-close-project]').forEach(function(el){ el.addEventListener('click', closeProjectModal); });
  }
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) closeProjectModal();
  });

  /* ---------- Current year in footer ---------- */
  var yearEl = document.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
