import nodemailer from "nodemailer";


interface Payload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services: string[];
  budget: string;
  timeline: string;
  preferredDate: string;
  preferredTime?: string;
  brief: string;
}

const corsHeaders = (req: Request) => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    req.headers.get("Access-Control-Request-Headers") ||
    "Content-Type, Authorization, x-client-info, apikey",
  "Access-Control-Max-Age": "86400",
});

Deno.serve(async (req: Request) => {
  const headers = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  try {
    const host = Deno.env.get("SMTP_HOST");
    const port = parseInt(Deno.env.get("SMTP_PORT") || "587");
    const user = Deno.env.get("SMTP_USER");
    const pass = Deno.env.get("SMTP_PASS");
    const smtpFrom = Deno.env.get("SMTP_FROM") || `EIDEN Group <${user}>`;
    const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL") || user;

    if (!host || !user || !pass) {
      throw new Error("Missing SMTP credentials. Set SMTP_HOST, SMTP_USER, SMTP_PASS.");
    }

    const payload = (await req.json()) as Payload;
    const { name, email, phone, company, services, budget, timeline, preferredDate, preferredTime, brief } = payload;

    if (!name || !email || !services?.length || !brief) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, services, brief" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    const companyInfo = company?.trim() || "Non renseigné";
    const phoneInfo = phone?.trim() || "Non renseigné";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const servicesStr = services.join(", ");
    const subject = `Nouvelle demande · ${name}${company ? ` · ${company}` : ""}`;

    await transporter.sendMail({
      from: smtpFrom,
      to: adminEmail,
      replyTo: email,
      subject,
      html: buildAdminEmailHtml({ name, email, phone: phoneInfo, company: companyInfo, services: servicesStr, budget, timeline, preferredDate, preferredTime, brief }),
    });

    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: "Confirmation de votre demande · EIDEN Group",
      html: buildVisitorEmailHtml(name),
    });

    transporter.close();

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...headers, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Internal server error" }),
      { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
    );
  }
});

/* ════════════════════════════════════════════
 *  ASSET URLs — Replace with your hosted assets
 *  Logo: wordmark   |   Icon: circular mark
 * ════════════════════════════════════════════ */

const LOGO_URL = "https://catalog.eiden-group.com/assets/logo-1-DCtIO3Wj.png";
const ICON_URL = "https://catalog.eiden-group.com/assets/icon-DrN0WKJE.png";

/* ════════════════════════════════════════════
 *  SHARED EMAIL SHELL — EIDEN Editorial Light
 * ════════════════════════════════════════════ */

type ShellContent = {
  preheader?: string;
  metaLeft: string;
  metaRight: string;
  figureLabel?: string;
  body: string;
};

function emailShell(content: ShellContent): string {
  const bg = "#FAF9F6";
  const fg = "#0E1B15";
  const fgMuted = "rgba(14,27,21,0.45)";
  const fgDim = "rgba(14,27,21,0.30)";
  const lineColor = "rgba(14,27,21,0.08)";
  const accentTeal = "#0C5657";
  const accentGold = "#9b8c6b";
  // oklch(0.180 0.022 165) = dark forest
  const footerBg = "#0E1B15";
  const footerFg = "#FAF9F6";
  const footerFgMuted = "rgba(250,249,246,0.45)";
  const footerLineColor = "rgba(250,249,246,0.12)";

  const preheaderBlock = content.preheader
    ? `<div style="display:none;font-size:1px;color:${bg};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${content.preheader}</div>`
    : "";

  const figureBlock = content.figureLabel
    ? `
          <tr>
            <td style="padding:16px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:'JetBrains Mono','Courier New',monospace;font-size:8px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${accentTeal};">
                    ${content.figureLabel}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
    `
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
  </style>
  ${preheaderBlock}
</head>
<body style="margin:0;padding:0;background-color:${bg};font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${bg};">
    <tr>
      <td align="center" style="padding:48px 20px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Mondrian bars -->
          <tr>
            <td style="padding:0;font-size:1px;line-height:1px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
                <tr>
                  <td style="height:3px;background-color:#0E1B15;width:40%;padding:0;"></td>
                  <td style="height:3px;background-color:#0C5657;width:25%;padding:0;"></td>
                  <td style="height:3px;background-color:#CFC292;width:20%;padding:0;"></td>
                  <td style="height:3px;background-color:#E85D4A;width:10%;padding:0;"></td>
                  <td style="height:3px;background-color:#2B5C8F;width:5%;padding:0;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- LOGO -->
          <tr>
            <td style="padding:32px 0 0;">
              <img src="${LOGO_URL}" alt="EIDEN Group" width="140" style="display:block;max-width:140px;height:auto;" />
            </td>
          </tr>

          <!-- Header meta -->
          <tr>
            <td style="padding:20px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:500;letter-spacing:2.8px;text-transform:uppercase;color:${fgMuted};">
                    ${content.metaLeft}
                  </td>
                  <td align="right" style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:500;letter-spacing:1.8px;text-transform:uppercase;color:${fgDim};">
                    ${content.metaRight}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:16px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="height:1px;background-color:${lineColor};font-size:1px;line-height:1px;"></td>
                </tr>
              </table>
            </td>
          </tr>

          ${figureBlock}

          <!-- Body -->
          <tr>
            <td style="padding:0;">
              ${content.body}
            </td>
          </tr>

          <!-- Spacer -->
          <tr>
            <td style="height:48px;font-size:1px;line-height:1px;"></td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

  <!-- DARK FOOTER WITH ICON — oklch(0.180 0.022 165) -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${footerBg};">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Icon centered -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <img src="${ICON_URL}" alt="EIDEN" width="48" style="display:block;width:48px;height:auto;opacity:0.9;" />
            </td>
          </tr>

          <!-- Footer text -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;line-height:1.8;color:${footerFgMuted};letter-spacing:0.6px;">
                    Agadir Bay, Technopole 1 Bloc B· Agadir, Maroc
                  </td>
                  <td align="right" style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;line-height:1.8;color:${footerFgMuted};letter-spacing:0.4px;">
                    <span style="color:#0C5657;">eiden-group.com</span><br />
                    <span style="color:#CFC292;">contact@eiden-group.com</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom rule -->
          <tr>
            <td style="padding:24px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="height:1px;background-color:${footerLineColor};font-size:1px;line-height:1px;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 0 0;font-family:'JetBrains Mono','Courier New',monospace;font-size:7px;letter-spacing:1px;text-transform:uppercase;color:rgba(250,249,246,0.25);text-align:center;">
              Business Architecture · Agadir, Maroc
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

/* ════════════════════════════════════════════
 *  ADMIN EMAIL — Editorial Demand Document
 * ════════════════════════════════════════════ */

function buildAdminEmailHtml(data: {
  name: string; email: string; phone: string; company: string;
  services: string; budget: string; timeline: string; preferredDate: string; preferredTime?: string; brief: string;
}): string {
  const { name, email, phone, company, services, budget, timeline, preferredDate, preferredTime, brief } = data;

  const fields = [
    { num: "01", label: "Nom complet", value: escapeHtml(name) },
    { num: "02", label: "E-mail", value: escapeHtml(email) },
    { num: "03", label: "Téléphone", value: escapeHtml(phone) },
    { num: "04", label: "Entreprise", value: escapeHtml(company) },
    { num: "05", label: "Services", value: escapeHtml(services) },
    { num: "06", label: "Budget", value: escapeHtml(budget) },
    { num: "07", label: "Horizon", value: escapeHtml(timeline) },
    { num: "08", "label": "Date souhaitée", value: escapeHtml(preferredDate) },
    ...(preferredTime ? [{ num: "08b", "label": "Heure souhaitée", value: escapeHtml(preferredTime) }] : []),
  ];

  const fieldsRows = fields.map((f) => `
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid rgba(14,27,21,0.06);">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="36" style="vertical-align:top;padding-top:1px;">
                          <span style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:600;color:#0C5657;letter-spacing:1px;">${f.num}</span>
                        </td>
                        <td width="120" style="font-family:'JetBrains Mono','Courier New',monospace;font-size:8px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9b8c6b;vertical-align:top;padding-top:3px;">
                          ${f.label}
                        </td>
                        <td style="font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;line-height:1.5;color:#0E1B15;vertical-align:top;">
                          ${f.value}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  `).join("");

  const body = `
        <!-- TITLE BLOCK -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:36px;">
          <tr>
            <td>
              <h1 style="margin:0;font-family:'Fraunces',Georgia,serif;font-size:30px;font-weight:400;line-height:1.2;letter-spacing:-0.5px;color:#0E1B15;">
                Demande de projet<br />
                <span style="font-weight:600;">reçue</span><span style="color:#E85D4A;">.</span>
              </h1>
              <p style="margin:16px 0 0;font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:rgba(14,27,21,0.50);max-width:420px;">
                Un prospect a soumis une demande depuis le catalogue de services. Lecture personnelle par un associé.
              </p>
            </td>
          </tr>
        </table>

        <!-- DIVIDER -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr>
            <td style="height:1px;background-color:rgba(14,27,21,0.08);font-size:1px;line-height:1px;"></td>
          </tr>
        </table>

        <!-- DATA GRID -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${fieldsRows}
              </table>
            </td>
          </tr>
        </table>

        <!-- BRIEF SECTION -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
          <tr>
            <td style="padding:28px 32px;background-color:#F5F2EB;border-left:2px solid #0C5657;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:'JetBrains Mono','Courier New',monospace;font-size:8px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#0C5657;padding-bottom:12px;">
                    09 · Brief
                  </td>
                </tr>
                <tr>
                  <td style="font-family:'Fraunces',Georgia,serif;font-size:15px;line-height:1.8;color:#0E1B15;font-style:italic;white-space:pre-wrap;">
                    "${escapeHtml(brief)}"
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- REPLY INFO -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
          <tr>
            <td style="font-family:'JetBrains Mono','Courier New',monospace;font-size:8px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:rgba(14,27,21,0.30);padding-bottom:8px;">
              Réponse · Directe
            </td>
          </tr>
          <tr>
            <td style="font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:rgba(14,27,21,0.55);line-height:1.6;">
              Répondre à <span style="color:#0C5657;">${escapeHtml(email)}</span> — sous 24 heures ouvrées.
            </td>
          </tr>
        </table>
  `;

  return emailShell({
    preheader: `Nouvelle demande de ${name}${company && company !== "Non renseigné" ? ` (${company})` : ""}`,
    metaLeft: "EIDEN GROUP",
    metaRight: "BUSINESS ARCHITECTURE",
    figureLabel: "FIG. 01 / 01",
    body,
  });
}

/* ════════════════════════════════════════════
 *  VISITOR CONFIRMATION — Editorial Document
 * ════════════════════════════════════════════ */

function buildVisitorEmailHtml(name: string): string {
  const steps = [
    { num: "01", title: "Lecture personnelle", desc: "Un associé lit votre brief personnellement" },
    { num: "02", title: "Proposition adaptée", desc: "Vous recevez une réponse sous 24 heures ouvrées" },
    { num: "03", title: "Échange sans engagement", desc: "Diagnostic clair, sans pitch commercial" },
  ];

  const stepsRows = steps.map((step) => `
          <tr>
            <td style="padding:16px 0;border-bottom:1px solid rgba(14,27,21,0.06);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="36" style="vertical-align:top;padding-top:1px;">
                    <span style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:600;color:#0C5657;letter-spacing:1px;">${step.num}</span>
                  </td>
                  <td style="vertical-align:top;">
                    <p style="margin:0;font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#0E1B15;line-height:1.4;">
                      ${step.title}
                    </p>
                    <p style="margin:4px 0 0;font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;color:rgba(14,27,21,0.45);line-height:1.5;">
                      ${step.desc}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `).join("");

  const body = `
        <!-- TITLE BLOCK Thank you, [Name]. -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:36px;">
          <tr>
            <td>
              <h1 style="margin:0;font-family:'Fraunces',Georgia,serif;font-size:30px;font-weight:400;line-height:1.2;letter-spacing:-0.5px;color:#0E1B15;">
                Merci, 
                <span style="font-weight:600;">${escapeHtml(name)}</span><span style="color:#E85D4A;">.</span>
              </h1>
              <p style="margin:16px 0 0;font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:rgba(14,27,21,0.50);max-width:420px;">
                Votre demande a bien été reçue. Un associé EIDEN lira personnellement votre brief et vous répondra sous 24 heures ouvrées.
              </p>
            </td>
          </tr>
        </table>

        <!-- DIVIDER -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr>
            <td style="height:1px;background-color:rgba(14,27,21,0.08);font-size:1px;line-height:1px;"></td>
          </tr>
        </table>

        <!-- NEXT STEPS -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr>
            <td style="font-family:'JetBrains Mono','Courier New',monospace;font-size:8px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#0C5657;padding-bottom:16px;">
              Prochaines étapes
            </td>
          </tr>
          ${stepsRows}
        </table>

        <!-- CLOSING NOTE -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
          <tr>
            <td style="font-family:'Fraunces',Georgia,serif;font-size:14px;font-style:italic;line-height:1.7;color:rgba(14,27,21,0.40);">
              Pas un problème de stratégie. Un problème de structure.
            </td>
          </tr>
        </table>
  `;

  return emailShell({
    preheader: `Merci ${name} Votre demande a bien été reçue`,
    metaLeft: "EIDEN GROUP",
    metaRight: "CONFIRMATION",
    figureLabel: "FIG. 01 / 01",
    body,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}