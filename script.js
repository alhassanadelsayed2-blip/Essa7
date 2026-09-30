/* =========================================================
   MOBILE NAV
========================================================= */

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".navlinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}


/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sections = document.querySelectorAll("section[id], header[id]");
const navAnchors = document.querySelectorAll(".navlinks a");

function updateActiveNav() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navAnchors.forEach(anchor => {
    anchor.classList.remove("active");

    const href = anchor.getAttribute("href");

    if (href === `#${current}`) {
      anchor.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("in-view");

          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("in-view");
  });

}


/* =========================================================
   BACK TO TOP
========================================================= */

const toTop = document.querySelector(".to-top");

if (toTop) {

  function updateToTop() {

    if (window.scrollY > 500) {
      toTop.classList.add("show");
    } else {
      toTop.classList.remove("show");
    }

  }

  window.addEventListener("scroll", updateToTop);

  updateToTop();

  toTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {

  blaban: {

    number: "01",

    kicker: "Featured Project · Business Intelligence",

    title: "B.Laban Analytics",

    description:
      "A business intelligence dashboard designed to turn retail sales data into clear insights around sales, profitability, products, branches, customers and promotions.",

    overview:
      "B.Laban Analytics focuses on connecting business performance with actionable analysis. The dashboard is structured to help decision-makers move from high-level performance to sales and profitability analysis, product intelligence, branch operations, and customer and promotion insights.",

    kpis: [
      {
        value: "Executive",
        label: "Business Overview"
      },
      {
        value: "Sales",
        label: "Sales Analysis"
      },
      {
        value: "Profit",
        label: "Profitability"
      },
      {
        value: "BI",
        label: "Decision Support"
      }
    ],

    gallery: [
      {
        image: "images/projects/blaban-home.png",
        caption: "Dashboard Home — Taste. Data. Growth."
      },
      {
        image: "images/projects/blaban-executive.png",
        caption: "Executive Overview — business performance and key indicators."
      },
      {
        image: "images/projects/blaban-sales.png",
        caption: "Sales & Profitability — performance across products and branches."
      }
    ]

  },


  techcorp: {

    number: "02",

    kicker: "Business Intelligence · Enterprise Analytics",

    title: "TechCorp — Business Intelligence",

    description:
      "An enterprise-style Power BI solution built to analyze projects, employees, tasks, milestones and performance across a connected business data model.",

    overview:
      "The TechCorp project brings multiple operational areas into one analytical environment. The dashboard connects project portfolio analysis with HR and performance insights and task-level operational monitoring, creating a structured view of enterprise performance.",

    kpis: [
      {
        value: "Projects",
        label: "Portfolio Analysis"
      },
      {
        value: "HR",
        label: "People & Performance"
      },
      {
        value: "Tasks",
        label: "Operations"
      },
      {
        value: "BI",
        label: "Enterprise Reporting"
      }
    ],

    gallery: [
      {
        image: "images/projects/techcorp-home.png",
        caption: "TechCorp Home — enterprise data platform overview."
      },
      {
        image: "images/projects/techcorp-executive.png",
        caption: "Executive Summary — high-level business performance."
      },
      {
        image: "images/projects/techcorp-portfolio.png",
        caption: "Project Portfolio — project-level analysis and monitoring."
      },
      {
        image: "images/projects/techcorp-hr.png",
        caption: "HR & Performance — employee and performance analysis."
      },
      {
        image: "images/projects/techcorp-tasks.png",
        caption: "Tasks & Operations — operational monitoring and task analysis."
      }
    ]

  },


  uber: {

    number: "03",

    kicker: "Data Analytics · Rider Behavior",

    title: "Uber — Rider Behavior & Booking Analysis",

    description:
      "A data analysis project exploring booking behavior, ride completion, vehicle demand, revenue and pickup patterns using an interactive Power BI dashboard.",

    overview:
      "The Uber analysis examines the booking journey from demand to completed rides and connects rider behavior with vehicle performance, revenue and pickup locations. The goal is to identify patterns that can support operational and commercial decisions.",

    kpis: [
      {
        value: "52M",
        label: "Total Booking Value"
      },
      {
        value: "149K",
        label: "Bookings"
      },
      {
        value: "62.51%",
        label: "Completion Rate"
      },
      {
        value: "93K",
        label: "Completed Rides"
      }
    ],

    gallery: [
      {
        image: "images/projects/uber-home.png",
        caption: "Uber Dashboard Home — booking and business overview."
      },
      {
        image: "images/projects/uber-overview.png",
        caption: "Overview — booking performance and rider behavior."
      },
      {
        image: "images/projects/uber-vehicle-demand.png",
        caption: "Vehicle Demand — demand patterns across vehicle categories."
      }
    ]

  }

};


/* =========================================================
   PROJECT MODAL ELEMENTS
========================================================= */

const projectModal = document.getElementById("projectModal");

const projectModalKicker =
  document.getElementById("projectModalKicker");

const projectModalTitle =
  document.getElementById("projectModalTitle");

const projectModalDescription =
  document.getElementById("projectModalDescription");

const projectModalNumber =
  document.getElementById("projectModalNumber");

const projectModalKpis =
  document.getElementById("projectModalKpis");

const projectModalOverview =
  document.getElementById("projectModalOverview");

const projectModalGallery =
  document.getElementById("projectModalGallery");


/* =========================================================
   OPEN PROJECT MODAL
========================================================= */

function openProject(projectKey) {

  if (!projectModal) return;

  const project = projectData[projectKey];

  if (!project) return;


  /* ---------- Header ---------- */

  projectModalKicker.textContent =
    project.kicker;

  projectModalTitle.textContent =
    project.title;

  projectModalDescription.textContent =
    project.description;

  projectModalNumber.textContent =
    project.number;


  /* ---------- KPIs ---------- */

  projectModalKpis.innerHTML = "";

  project.kpis.forEach(kpi => {

    const card = document.createElement("div");

    card.className = "dialog-kpi";

    card.innerHTML = `
      <div class="v">${kpi.value}</div>
      <div class="l">${kpi.label}</div>
    `;

    projectModalKpis.appendChild(card);

  });


  /* ---------- Overview ---------- */

  projectModalOverview.textContent =
    project.overview;


  /* ---------- Gallery ---------- */

  projectModalGallery.innerHTML = "";

  project.gallery.forEach(item => {

    const figure = document.createElement("figure");

    figure.className = "dialog-shot";

    figure.innerHTML = `
      <img
        src="${item.image}"
        alt="${item.caption}"
        loading="lazy"
      >
      <figcaption>${item.caption}</figcaption>
    `;

    projectModalGallery.appendChild(figure);

  });


  /* ---------- Open ---------- */

  projectModal.classList.add("open");

  projectModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

}


/* =========================================================
   CLOSE PROJECT MODAL
========================================================= */

function closeProject() {

  if (!projectModal) return;

  projectModal.classList.remove("open");

  projectModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

}


/* =========================================================
   PROJECT CARDS
========================================================= */

const projectCards =
  document.querySelectorAll(".project-card");

projectCards.forEach(card => {

  card.addEventListener("click", () => {

    const projectKey =
      card.dataset.project;

    openProject(projectKey);

  });

});


/* =========================================================
   MODAL CLOSE BUTTONS / BACKDROP
========================================================= */

document.querySelectorAll("[data-close-project]")
  .forEach(button => {

    button.addEventListener("click", closeProject);

  });


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    /*
      If lightbox is open,
      close it first.
    */

    if (
      lightbox &&
      lightbox.classList.contains("open")
    ) {

      closeLightbox();

      return;
    }


    if (
      projectModal &&
      projectModal.classList.contains("open")
    ) {

      closeProject();

    }

  }

});


/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxClose =
  document.querySelector(".lightbox-close");


/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openLightbox(imageSrc, altText = "") {

  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = imageSrc;

  lightboxImage.alt = altText;

  lightbox.classList.add("open");

}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

  if (!lightbox) return;

  lightbox.classList.remove("open");

}


/* =========================================================
   PROJECT GALLERY CLICK
========================================================= */

if (projectModalGallery) {

  projectModalGallery.addEventListener("click", event => {

    const image =
      event.target.closest("img");

    if (!image) return;

    event.stopPropagation();

    openLightbox(
      image.src,
      image.alt
    );

  });

}


/* =========================================================
   OLD SITE SCREENSHOT LIGHTBOX
========================================================= */

document.querySelectorAll(".shot img")
  .forEach(image => {

    image.addEventListener("click", event => {

      event.stopPropagation();

      openLightbox(
        image.src,
        image.alt
      );

    });

  });


/* =========================================================
   LIGHTBOX CLOSE
========================================================= */

if (lightboxClose) {

  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );

}


if (lightbox) {

  lightbox.addEventListener("click", event => {

    /*
      Clicking the dark background closes it,
      clicking the actual image does not.
    */

    if (event.target === lightbox) {

      closeLightbox();

    }

  });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElements =
  document.querySelectorAll("[data-year]");

yearElements.forEach(element => {

  element.textContent =
    new Date().getFullYear();

});


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.addEventListener(
  "error",
  event => {

    if (
      event.target &&
      event.target.tagName === "IMG"
    ) {

      event.target.classList.add(
        "image-error"
      );

    }

  },
  true
);