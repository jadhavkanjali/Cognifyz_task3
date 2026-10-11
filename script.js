const app = document.getElementById("app");
const navLinks = document.querySelectorAll("[data-link]");

let savedValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  terms: false
};

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">COGNIFYZ • LEVEL 2 • TASK 4</p>
        <h1>Smart forms.<br><span>Stronger validation.</span></h1>
        <p>Validate user input, check password strength,
        and navigate smoothly without full-page reloads.</p>
        <a class="primary-button" href="/register" data-link>
          Register Now →
        </a>
      </div>
      <div class="hero-card">
        <div class="card-symbol">✓</div>
        <h2>Built for better input</h2>
        <p>Real-time checks and dynamic user feedback.</p>
        <div class="mini-status">
          <span class="status-dot"></span> JavaScript enabled
        </div>
      </div>
    </section>
    <section class="features">
      <article class="feature-card">
        <div class="feature-icon">01</div>
        <h3>Form Validation</h3>
        <p>Validate email, phone, password and required fields.</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon">02</div>
        <h3>Dynamic DOM</h3>
        <p>Show instant messages and a password-strength meter.</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon">03</div>
        <h3>SPA Navigation</h3>
        <p>Change pages without reloading the whole document.</p>
      </article>
    </section>`;
}

function renderRegister() {
  return `
    <section class="page-section">
      <div class="page-heading">
        <p class="eyebrow">CREATE YOUR ACCOUNT</p>
        <h1>Registration Form</h1>
        <p>Enter your details. Errors will appear as you type.</p>
      </div>

      <div class="panel">
        <div id="formMessage" class="form-message"
             role="status" aria-live="polite"></div>

        <form id="registerForm" novalidate>
          <div class="form-grid">
            <div class="field">
              <label for="name">Full Name *</label>
              <input id="name" name="name" type="text"
                autocomplete="name" placeholder="e.g. Anjali Jadhav"
                required>
              <small id="nameError">At least 2 characters.</small>
            </div>

            <div class="field">
              <label for="email">Email Address *</label>
              <input id="email" name="email" type="email"
                autocomplete="email" placeholder="you@example.com"
                required>
              <small id="emailError">Enter a valid email address.</small>
            </div>

            <div class="field full">
              <label for="phone">Phone Number *</label>
              <input id="phone" name="phone" type="tel"
                autocomplete="tel" placeholder="10-digit Indian mobile number"
                inputmode="numeric" required>
              <small id="phoneError">
                Enter a valid 10-digit Indian mobile number starting with 6–9.
              </small>
            </div>

            <div class="field full">
              <label for="password">Password *</label>
              <div class="password-wrap">
                <input id="password" name="password" type="password"
                  autocomplete="new-password"
                  placeholder="Create a strong password" required>
                <button type="button" class="show-password"
                  data-toggle="password" aria-pressed="false">
                  Show
                </button>
              </div>
              <div class="strength-track" aria-hidden="true">
                <div id="strengthBar" class="strength-bar"></div>
              </div>
              <small id="strengthText" aria-live="polite">
                Strength: Not entered
              </small>
              <small id="passwordError">
                Use 8+ characters, uppercase, lowercase, a number and a symbol.
              </small>
            </div>

            <div class="field full">
              <label for="confirmPassword">Confirm Password *</label>
              <div class="password-wrap">
                <input id="confirmPassword" name="confirmPassword"
                  type="password" autocomplete="new-password"
                  placeholder="Re-enter your password" required>
                <button type="button" class="show-password"
                  data-toggle="confirmPassword" aria-pressed="false">
                  Show
                </button>
              </div>
              <small id="confirmPasswordError">
                Both passwords must match.
              </small>
            </div>
          </div>

          <label class="check-row" for="terms">
            <input id="terms" name="terms" type="checkbox" required>
            <span>I agree to the terms and conditions. *</span>
          </label>
          <small id="termsError"></small>

          <button id="submitButton" class="form-button" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </section>`;
}

function renderAbout() {
  return `
    <section class="page-section">
      <div class="page-heading">
        <p class="eyebrow">ABOUT THE PROJECT</p>
        <h1>Complex Form Validation</h1>
        <p>A frontend demonstration created for Cognifyz Level 2, Task 4.</p>
      </div>
      <div class="panel">
        <h2>Project objectives</h2>
        <ul class="info-list">
          <li>Apply custom validation rules to user input.</li>
          <li>Update the DOM based on user interactions.</li>
          <li>Display password strength and helpful error messages.</li>
          <li>Navigate between Home, Register and About without
              reloading the document.</li>
        </ul>
        <p><strong>Technologies:</strong> HTML5, CSS3 and JavaScript.</p>
        <a class="primary-button" href="/register" data-link>
          Try the Registration Form →
        </a>
      </div>
    </section>`;
}

function navigate(path) {
  const validPaths = ["/", "/register", "/about"];

  if (!validPaths.includes(path)) {
    path = "/";
  }

  history.pushState({}, "", path);
  renderPage();
}

function renderPage() {
  const path = window.location.pathname;

  if (path === "/register") {
    app.innerHTML = renderRegister();
    setupForm();
    restoreFormValues();
  } else if (path === "/about") {
    app.innerHTML = renderAbout();
  } else {
    app.innerHTML = renderHome();
  }

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    link.classList.toggle("active", linkPath === path);
  });

  window.scrollTo(0, 0);
}

document.addEventListener("click", event => {
  const link = event.target.closest("a[data-link]");

  if (!link) return;

  if (
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  navigate(new URL(link.href).pathname);
});

window.addEventListener("popstate", renderPage);

function setupForm() {
  const form = document.getElementById("registerForm");

  const fields = [
    "name", "email", "phone", "password", "confirmPassword"
  ];

  fields.forEach(id => {
    const field = document.getElementById(id);

    field.addEventListener("input", () => {
      saveFormValues();
      validateField(id);
      updatePasswordStrength();
      if (id === "password") validateField("confirmPassword");
      hideFormMessage();
    });

    field.addEventListener("blur", () => validateField(id));
  });

  document.getElementById("terms").addEventListener("change", () => {
    saveFormValues();
    validateField("terms");
    hideFormMessage();
  });

  document.querySelectorAll("[data-toggle]").forEach(button => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.toggle);
      const isHidden = input.type === "password";

      input.type = isHidden ? "text" : "password";
      button.textContent = isHidden ? "Hide" : "Show";
      button.setAttribute("aria-pressed", String(isHidden));
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    saveFormValues();

    const results = fields.map(id => validateField(id));
    results.push(validateField("terms"));

    if (results.every(Boolean)) {
      showFormMessage(
        "Registration successful! Your form passed all validation checks.",
        "success"
      );

      form.innerHTML = `
        <div class="success-panel">
          <div class="card-symbol">✓</div>
          <h2>Registration Successful!</h2>
          <p>Welcome, ${escapeHTML(savedValues.name)}.</p>
          <p>Your details passed the client-side validation checks.</p>
          <button type="button" class="form-button"
            id="newRegistration">Register Another User</button>
        </div>`;

      document.getElementById("newRegistration").addEventListener("click", () => {
        savedValues = {
          name: "", email: "", phone: "",
          password: "", confirmPassword: "", terms: false
        };
        app.innerHTML = renderRegister();
        setupForm();
      });
    } else {
      showFormMessage(
        "Please correct the highlighted fields before submitting.",
        "error"
      );

      const firstInvalid = form.querySelector("input.invalid");
      if (firstInvalid) firstInvalid.focus();
    }
  });
}

function validateField(id) {
  const input = document.getElementById(id);
  const error = document.getElementById(id + "Error");

  if (!input) return true;

  let message = "";
  const value = input.value.trim();

  if (id === "name") {
    if (value.length < 2) {
      message = "Name must contain at least 2 characters.";
    } else if (!/^[\p{L}][\p{L}\p{M} .'-]*$/u.test(value)) {
      message = "Use letters, spaces, apostrophes, dots or hyphens.";
    }
  }

  if (id === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      message = "Enter a valid email, such as you@example.com.";
    }
  }

  if (id === "phone") {
    if (!/^[6-9]\d{9}$/.test(value)) {
      message = "Enter a valid 10-digit mobile number starting with 6–9.";
    }
  }

  if (id === "password") {
    const strong =
      value.length >= 8 &&
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value) &&
      /\d/.test(value) &&
      /[^A-Za-z0-9]/.test(value);

    if (!strong) {
      message = "Use 8+ characters with uppercase, lowercase, a number and a symbol.";
    }
  }

  if (id === "confirmPassword") {
    const password = document.getElementById("password").value;

    if (!value || value !== password) {
      message = "Passwords do not match.";
    }
  }

  if (id === "terms" && !input.checked) {
    message = "You must accept the terms to continue.";
  }

  input.classList.toggle("invalid", Boolean(message));
  input.classList.toggle("valid", !message);

  if (error) {
    error.textContent = message || (
      id === "terms" ? "" : "Looks good!"
    );
    error.classList.toggle("error-text", Boolean(message));
    error.classList.toggle("success-text", !message);
  }

  if (id === "terms") {
    input.setAttribute("aria-invalid", String(Boolean(message)));
  } else {
    input.setAttribute("aria-invalid", String(Boolean(message)));
  }

  return !message;
}

function updatePasswordStrength() {
  const password = document.getElementById("password");
  if (!password) return;

  const value = password.value;
  const bar = document.getElementById("strengthBar");
  const text = document.getElementById("strengthText");

  let score = 0;

  if (value.length >= 8) score++;
  if (/[a-z]/.test(value)) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  const labels = [
    "Not entered", "Very weak", "Weak", "Fair", "Good", "Strong"
  ];

  bar.style.width = (score * 20) + "%";
  bar.style.background =
    score <= 2 ? "#c0394b" :
    score <= 3 ? "#d99020" : "#16865c";

  text.textContent = "Strength: " + labels[score];
}

function saveFormValues() {
  ["name", "email", "phone", "password", "confirmPassword"].forEach(id => {
    const input = document.getElementById(id);
    if (input) savedValues[id] = input.value;
  });

  const terms = document.getElementById("terms");
  if (terms) savedValues.terms = terms.checked;
}

function restoreFormValues() {
  ["name", "email", "phone", "password", "confirmPassword"].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = savedValues[id] || "";
  });

  const terms = document.getElementById("terms");
  if (terms) terms.checked = savedValues.terms;

  updatePasswordStrength();
}

function showFormMessage(message, type) {
  const box = document.getElementById("formMessage");
  if (!box) return;

  box.textContent = message;
  box.className = "form-message show " + type;
}

function hideFormMessage() {
  const box = document.getElementById("formMessage");
  if (box) box.className = "form-message";
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

renderPage();