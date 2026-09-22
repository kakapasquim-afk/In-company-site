/* UNIPAR IN COMPANY — contact form
   Envia os dados de contato para a API serverless (api/contact.js),
   que realiza o envio real via Resend no servidor.
   A RESEND_API_KEY é usada apenas no servidor e nunca chega ao navegador. */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusBox = document.getElementById("contact-status");
  var submitBtn = form.querySelector('[type="submit"]');
  var originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var SPINNER =
    '<svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';

  var ICONS = {
    error:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  };

  function sanitize(value) {
    if (value == null) return "";
    return String(value).replace(/<[^>]*>/g, "").trim().slice(0, 5000);
  }

  function renderStatus(state) {
    if (!state || state.status === "idle") return;
    statusBox.hidden = false;
    statusBox.classList.remove("form-status--error", "form-status--ok");
    var isError = state.status === "error";
    statusBox.classList.add(isError ? "form-status--error" : "form-status--ok");
    statusBox.setAttribute("role", "status");
    statusBox.setAttribute("aria-live", "polite");
    statusBox.innerHTML = (isError ? ICONS.error : ICONS.ok) + "<span>" + state.message + "</span>";
    statusBox.focus();
  }

  function clearStatus() {
    statusBox.hidden = true;
    statusBox.classList.remove("form-status--error", "form-status--ok");
    statusBox.innerHTML = "";
  }

  function inputByName(name) {
    return form.querySelector('[name="' + name + '"]');
  }

  function clearFieldErrors() {
    form.querySelectorAll(".form-field__error").forEach(function (p) {
      p.remove();
    });
    form.querySelectorAll(".form-input--error, .form-textarea--error").forEach(function (el) {
      el.classList.remove("form-input--error", "form-textarea--error");
    });
  }

  function setFieldError(name, msg) {
    var input = inputByName(name);
    if (!input) return;
    var wrap = input.closest(".form-field");
    if (!wrap) return;
    var isTextarea = input.tagName === "TEXTAREA";
    input.classList.add(isTextarea ? "form-textarea--error" : "form-input--error");
    var p = wrap.querySelector(".form-field__error");
    if (!p) {
      p = document.createElement("p");
      p.className = "form-field__error";
      wrap.appendChild(p);
    }
    p.textContent = msg;
  }

  function setLoading(on) {
    submitBtn.disabled = on;
    submitBtn.innerHTML = on ? SPINNER + " Enviando..." : originalBtnHtml;
  }

  function showError(message, serverErrors) {
    renderStatus({ status: "error", message: message });
    if (serverErrors) {
      Object.keys(serverErrors).forEach(function (field) {
        setFieldError(field, serverErrors[field]);
      });
    }
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    /* Impede envios duplicados enquanto uma requisição está em andamento. */
    if (submitBtn.disabled) return;

    clearStatus();
    clearFieldErrors();

    var formData = new FormData(form);
    var name = sanitize(formData.get("name"));
    var email = sanitize(formData.get("email"));
    var phone = sanitize(formData.get("phone"));
    var company = sanitize(formData.get("company"));
    var message = sanitize(formData.get("message"));

    var errors = {};
    if (!name) errors.name = "Informe seu nome.";
    if (!email) errors.email = "Informe seu e-mail.";
    else if (!EMAIL_RE.test(email)) errors.email = "Informe um e-mail válido.";
    if (!message) errors.message = "Escreva sua mensagem.";

    if (Object.keys(errors).length > 0) {
      renderStatus({ status: "error", message: "Verifique os campos destacados." });
      Object.keys(errors).forEach(function (field) {
        setFieldError(field, errors[field]);
      });
      return;
    }

    setLoading(true);
    try {
      var payload = {
        name: name,
        company: company,
        email: email,
        phone: phone,
        message: message,
        website: String(formData.get("website") || "").trim(),
      };

      var response;
      var result = {};
      try {
        response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(20000) : undefined,
        });
        result = await response.json().catch(function () {
          return {};
        });
      } catch (networkErr) {
        showError("Não foi possível enviar sua mensagem. Tente novamente.");
        return;
      }

      if (response.ok && result.status === "success") {
        renderStatus({
          status: "ok",
          message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        });
        form.reset();
      } else {
        showError(
          result.message || "Não foi possível enviar sua mensagem. Tente novamente.",
          result.errors
        );
      }
    } finally {
      setLoading(false);
    }
  });
})();