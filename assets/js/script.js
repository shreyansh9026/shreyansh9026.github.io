function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderList(items = []) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderChips(items = []) {
  return items.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("");
}

function formatListWithAnd(items = []) {
  if (!items.length) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function renderProjectsSection(content) {
  if (!content?.projects) {
    return;
  }

  const intro = document.getElementById("projectsIntro");
  const showcase = document.getElementById("projectsShowcase");
  const archiveGrid = document.getElementById("projectsArchiveGrid");

  if (intro) {
    intro.textContent = content.projects.intro;
  }

  if (showcase) {
    showcase.innerHTML = content.projects.highlights
      .map((project) => {
        const classes = ["project-card", "reveal"];

        if (project.featured) {
          classes.push("featured-main");
        }

        if (project.accent) {
          classes.push("accent-card");
        }

        return `
          <article class="${classes.join(" ")}">
            <div class="project-topline">
              <span class="section-tag">${escapeHtml(project.tag)}</span>
              <span class="project-year">${escapeHtml(project.year)}</span>
            </div>
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.description)}</p>
            <div class="chip-list">
              ${renderChips(project.chips)}
            </div>
            <ul class="list">
              ${renderList(project.bullets)}
            </ul>
            ${project.note ? `<p class="project-note">${escapeHtml(project.note)}</p>` : ""}
          </article>
        `;
      })
      .join("");
  }

  if (archiveGrid) {
    archiveGrid.innerHTML = content.projects.archive
      .map(
        (project) => `
          <div class="archive-item">
            <strong>${escapeHtml(project.title)}</strong>
            <span>${escapeHtml(project.summary)}</span>
          </div>
        `
      )
      .join("");
  }
}

function renderExperienceSection(content) {
  if (!content?.experience) {
    return;
  }

  const intro = document.getElementById("experienceIntro");
  const timeline = document.getElementById("experienceTimeline");

  if (intro) {
    intro.textContent = content.experience.intro;
  }

  if (timeline) {
    timeline.innerHTML = content.experience.items
      .map(
        (item) => `
          <article class="timeline-item reveal">
            <div class="timeline-date">${escapeHtml(item.date)}</div>
            <div class="timeline-content">
              <h3>${escapeHtml(item.title)}</h3>
              <ul class="list">
                ${renderList(item.bullets)}
              </ul>
            </div>
          </article>
        `
      )
      .join("");
  }
}

function renderCertificationsSection(content) {
  if (!content?.certifications) {
    return;
  }

  const intro = document.getElementById("certificationsIntro");
  const grid = document.getElementById("certificationsGrid");

  if (intro) {
    intro.textContent = content.certifications.intro;
  }

  if (grid) {
    grid.innerHTML = content.certifications.cards
      .map((card) => {
        const classes = ["card", "reveal"];

        if (card.featured) {
          classes.push("feature-card");
        }

        return `
          <div class="${classes.join(" ")}">
            <span class="section-tag">${escapeHtml(card.tag)}</span>
            <h3>${escapeHtml(card.title)}</h3>
            ${card.description ? `<p>${escapeHtml(card.description)}</p>` : ""}
            <ul class="list">
              ${renderList(card.bullets)}
            </ul>
            ${card.note ? `<p class="note">${escapeHtml(card.note)}</p>` : ""}
          </div>
        `;
      })
      .join("");
  }
}

function syncHeroContent(content) {
  if (!content?.projects || !content?.certifications) {
    return;
  }

  const latestProjects = content.projects.highlights.slice(0, 2);
  const latestProjectTitles = latestProjects.map((project) => project.title);
  const agentSource =
    content.certifications.cards.find((card) => Array.isArray(card.bullets) && card.featured) ||
    content.certifications.cards.find((card) => Array.isArray(card.bullets));
  const agentNames = agentSource
    ? agentSource.bullets
        .map((item) => item.split(" - ")[0].trim())
        .filter(Boolean)
    : [];

  setText(
    "momentumProjectsText",
    `Recent highlights include ${formatListWithAnd(latestProjectTitles)}, and a multi-agent system built for the Google Hack2Skill Competition.`
  );
  setText("latestProjectsCount", String(latestProjects.length));
  setText("latestProjectsNames", formatListWithAnd(latestProjectTitles));
  setText("agentCount", String(agentNames.length));
  setText("agentNames", formatListWithAnd(agentNames));
}

function syncContactFormDefaults() {
  const urlInput = document.querySelector('input[name="_url"]');

  if (urlInput) {
    urlInput.value = window.location.href;
  }
}

function renderDynamicContent() {
  const content = typeof portfolioContent === "object" ? portfolioContent : null;

  if (!content) {
    return;
  }

  renderProjectsSection(content);
  renderExperienceSection(content);
  renderCertificationsSection(content);
  syncHeroContent(content);
  syncContactFormDefaults();
}

renderDynamicContent();

const revealElements = [...document.querySelectorAll(".reveal")];
const menuToggle = document.getElementById("menuToggle");
const siteHeader = document.querySelector(".site-header");
const navLinks = [...document.querySelectorAll(".nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const progressBar = document.getElementById("scrollProgress");
const year = document.getElementById("year");

const prefersReducedMotion =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) {
  year.textContent = new Date().getFullYear();
}

revealElements.forEach((element, index) => {
  element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
});

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

function closeMenu() {
  if (!siteHeader || !menuToggle) {
    return;
  }

  siteHeader.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && siteHeader) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 920) {
    closeMenu();
  }
});

function updateScrollProgress() {
  if (!progressBar) {
    return;
  }

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
  progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
}

function updateActiveSection() {
  if (!sections.length || !navLinks.length) {
    return;
  }

  const position = window.scrollY + 160;
  let currentId = sections[0].id;

  sections.forEach((section) => {
    if (position >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute("href");
    link.classList.toggle("active", target === `#${currentId}`);
  });
}

let ticking = false;

function handleScroll() {
  if (ticking) {
    return;
  }

  ticking = true;
  window.requestAnimationFrame(() => {
    updateScrollProgress();
    updateActiveSection();
    ticking = false;
  });
}

updateScrollProgress();
updateActiveSection();

window.addEventListener("scroll", handleScroll, { passive: true });

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const formAction = form?.getAttribute("action") || "https://formsubmit.co/shreyanshtripathi115@gmail.com";
const CONTACT_API_URL = formAction.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/");

if (form && statusText) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      _honey: String(formData.get("_honey") || "").trim(),
      _replyto: String(formData.get("email") || "").trim(),
      _subject: String(formData.get("_subject") || "New Contact from Portfolio").trim(),
      _template: String(formData.get("_template") || "table").trim(),
      _url: String(formData.get("_url") || window.location.href).trim()
    };

    statusText.classList.remove("error");
    statusText.textContent = "Submitting message...";

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let detail = "Unable to submit message at the moment.";

        try {
          const body = await response.json();
          if (typeof body.detail === "string") {
            detail = body.detail;
          }
        } catch (_) {
          // Keep fallback detail.
        }

        throw new Error(detail);
      }

      statusText.textContent = "Message sent successfully. Thanks for reaching out.";
      form.reset();
      syncContactFormDefaults();
    } catch (error) {
      const detail = String(error.message || "");
      const normalizedDetail = detail.toLowerCase();

      statusText.classList.add("error");

      if (window.location.protocol === "file:") {
        statusText.textContent =
          "Cannot send the form when opening the file directly. Please test on a local server or the deployed site.";
      } else if (normalizedDetail.includes("activate") || normalizedDetail.includes("confirm")) {
        statusText.textContent =
          "FormSubmit needs a one-time activation for shreyanshtripathi115@gmail.com. Check that inbox and spam folder, activate the form, then try again.";
      } else {
        statusText.textContent = `${detail} You can also email directly at shreyanshtripathi115@gmail.com.`;
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
