"use strict";

/* UNIPAR IN COMPANY — Vercel Serverless Function (Node 18+)
   Envio real do formulário de contato via Resend.
   - A RESEND_API_KEY vive APENAS neste processo (variável de ambiente),
     nunca é exposta ao navegador e nunca é devolvida nas respostas.
   - Sem dependências externas: usa o fetch global do Node para a API do Resend.
   - Anti-spam simples sem banco de dados: honeypot + limite por IP em memória. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 200;
const MAX_COMPANY = 300;
const MAX_PHONE = 40;
const MAX_MESSAGE = 5000;

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO = "celso.ferrari@prof.unipar.br";
const DEFAULT_FROM = "Unipar In Company <onboarding@resend.dev>";

/* Limite simples por IP (em memória, por instância da function).
   Sem banco de dados: suficiente para conter abuso leve. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();

function sanitize(value, max) {
  if (value == null) return "";
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/\0/g, "")
    .trim()
    .slice(0, max);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clientIp(req) {
  var raw = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "local";
  return String(raw).split(",")[0].trim();
}

function allowed(req) {
  var now = Date.now();
  var ip = clientIp(req);
  var entry = hits.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_WINDOW_MS) {
    entry = { count: 0, start: now };
  }
  entry.count += 1;
  hits.set(ip, entry);
  return entry.count <= RATE_LIMIT;
}

function validate(payload) {
  var errors = {};
  var name = sanitize(payload.name, MAX_NAME);
  var email = sanitize(payload.email, 254);
  var message = sanitize(payload.message, MAX_MESSAGE);

  if (!name) errors.name = "Informe seu nome.";
  if (!email) errors.email = "Informe seu e-mail.";
  else if (!EMAIL_RE.test(email)) errors.email = "Informe um e-mail válido.";
  else if (email.length > 254) errors.email = "E-mail muito longo.";

  if (!message) errors.message = "Escreva sua mensagem.";
  else if (message.length < 10) errors.message = "Escreva uma mensagem mais detalhada.";
  if (String(payload.company || "").length > MAX_COMPANY) errors.company = "Empresa muito longa.";
  if (String(payload.phone || "").length > MAX_PHONE) errors.phone = "Telefone muito longo.";

  return errors;
}

function buildEmailHtml(data) {
  var esc = escapeHtml;
  var rows = [
    { label: "Nome", value: esc(data.name) },
    { label: "Empresa / Organização", value: esc(data.company) || "-" },
    { label: "E-mail", value: esc(data.email) },
    { label: "Telefone", value: esc(data.phone) || "-" },
  ];

  var fields = rows
    .map(function (row) {
      return (
        '<tr>' +
        '<td style="padding:8px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#88898c;">' +
        row.label +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="padding:0 0 14px;font-size:15px;line-height:1.5;color:#17121f;">' +
        row.value +
        '</td>' +
        '</tr>'
      );
    })
    .join("");

  return (
    '<!DOCTYPE html>' +
    '<html lang="pt-BR">' +
    '<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />' +
    '<title>Novo contato pelo site</title></head>' +
    '<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Manrope,Arial,Helvetica,sans-serif;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f4f5;padding:24px 12px;">' +
    '<tr><td align="center">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ececee;">' +
    '<tr>' +
    '<td style="background-color:#c8102e;padding:28px 32px;color:#ffffff;">' +
    '<div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.85;margin-bottom:6px;">Unipar In Company</div>' +
    '<div style="font-size:22px;line-height:1.2;font-weight:800;">NOVO CONTATO PELO SITE</div>' +
    '</td>' +
    '</tr>' +
    '<tr><td style="padding:28px 32px;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">' +
    fields +
    '<tr><td style="height:1px;background-color:#ececee;margin:10px 0;"></td></tr>' +
    '<tr><td style="padding-top:18px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#88898c;">Mensagem</td></tr>' +
    '<tr>' +
    '<td style="padding:8px 0 0;border-radius:8px;background-color:#faf6f7;border:1px solid #f0e4e7;font-size:15px;line-height:1.6;color:#17121f;font-style:italic;">' +
    data.messageHtml +
    '</td>' +
    '</tr>' +
    '</table>' +
    '</td></tr>' +
    '<tr>' +
    '<td style="padding:20px 32px 26px;border-top:1px solid #ececee;color:#88898c;font-size:12px;line-height:1.5;">' +
    "Esta mensagem foi enviada através do formulário de contato do site." +
    '<div style="margin-top:6px;color:#5c5b5e;">Unipar In Company — Universidade Paranaense</div>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '</td></tr>' +
    '</table>' +
    '</body></html>'
  );
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ status: "error", message: "Método não permitido." });
    return;
  }

  if (!allowed(req)) {
    res
      .status(429)
      .json({ status: "error", message: "Muitas tentativas. Aguarde alguns minutos e tente novamente." });
    return;
  }

  var payload;
  try {
    payload = req.body && typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");
  } catch (err) {
    res.status(400).json({ status: "error", message: "Requisição inválida." });
    return;
  }

  if (payload && typeof payload !== "object") {
    res.status(400).json({ status: "error", message: "Requisição inválida." });
    return;
  }

  var website = String(payload.website || "").trim();
  if (website !== "") {
    /* Honeypot preenchido = bot. Responde sucesso silencioso sem enviar. */
    res.status(200).json({
      status: "success",
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    });
    return;
  }

  var errors = validate(payload);
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ status: "error", message: "Verifique os campos destacados.", errors: errors });
    return;
  }

  var apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY não configurada no servidor; envio não realizado.");
    res.status(500).json({ status: "error", message: "Não foi possível enviar sua mensagem. Tente novamente." });
    return;
  }

  var name = sanitize(payload.name, MAX_NAME);
  var email = sanitize(payload.email, 254);
  var phone = sanitize(payload.phone, MAX_PHONE);
  var company = sanitize(payload.company, MAX_COMPANY);
  var message = sanitize(payload.message, MAX_MESSAGE);

  var html = buildEmailHtml({
    name: name,
    company: company,
    email: email,
    phone: phone,
    messageHtml: escapeHtml(message).replace(/\n/g, "<br />"),
  });

  var to = (process.env.RESEND_TO_EMAIL || DEFAULT_TO).trim();
  var from = (process.env.RESEND_FROM_EMAIL || DEFAULT_FROM).trim();

  try {
    var controller = typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined;
    var resendRes = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: from,
        to: [to],
        reply_to: email,
        subject: "Novo contato pelo site — " + name,
        html: html,
      }),
      signal: controller,
    });

    if (!resendRes.ok) {
      console.error("[contact] Falha no Resend:", resendRes.status, await resendRes.text());
      res.status(500).json({ status: "error", message: "Não foi possível enviar sua mensagem. Tente novamente." });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    });
  } catch (err) {
    console.error("[contact] Erro ao enviar via Resend:", err && err.message ? err.message : err);
    res.status(500).json({ status: "error", message: "Não foi possível enviar sua mensagem. Tente novamente." });
  }
};