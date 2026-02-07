const THEME_KEY = "portfolio_theme";
const THEME_META = document.querySelector('meta[name="theme-color"]');
const THEME_COLORS = {
  dark: "#101114",
  light: "#f2eee6"
};

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

function setTheme(theme, persist = true) {
  const resolved = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", resolved);

  if (THEME_META) {
    THEME_META.setAttribute("content", THEME_COLORS[resolved]);
  }

  const toggle = document.getElementById("themeToggle");
  const toggleText = document.getElementById("themeToggleText");
  if (toggle && toggleText) {
    const isDark = resolved === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggleText.textContent = isDark ? "Light Mode" : "Dark Mode";
  }

  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, resolved);
    } catch (_) {
      // ignore storage issues and continue with runtime theme
    }
  }
}

function initTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (_) {
    savedTheme = null;
  }

  if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme, false);
    return;
  }

  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(prefersLight ? "light" : "dark", false);
}

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

initTheme();

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll("#projectGrid .project-card");

function applyProjectFilter(filter) {
  projectCards.forEach((card) => {
    const raw = card.getAttribute("data-category") || "";
    const categories = raw.split(" ").filter(Boolean);
    const visible = filter === "all" || categories.includes(filter);
    card.classList.toggle("is-hidden", !visible);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter") || "all";

    filterButtons.forEach((btn) => {
      const active = btn === button;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    applyProjectFilter(filter);
  });
});

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const CONTACT_API_URL = "https://formsubmit.co/ajax/shreyanshtripathi115@gmail.com";

if (form && statusText) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      company: String(formData.get("company") || "").trim()
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
          "Accept": "application/json"
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
          // fallback detail stays unchanged
        }
        throw new Error(detail);
      }

      statusText.textContent = "Message sent successfully. Thanks for reaching out.";
      form.reset();
    } catch (error) {
      statusText.classList.add("error");
      statusText.textContent = `${error.message} You can also email directly at shreyanshtripathi115@gmail.com.`;
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
