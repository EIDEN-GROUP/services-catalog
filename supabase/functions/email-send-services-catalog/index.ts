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
    const { name, email, phone, company, services, budget, timeline, preferredDate, brief } = payload;

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
    const subject = `Nouvelle commission · ${name}${company ? ` · ${company}` : ""}`;

    await transporter.sendMail({
      from: smtpFrom,
      to: adminEmail,
      replyTo: email,
      subject,
      html: buildAdminEmailHtml({ name, email, phone: phoneInfo, company: companyInfo, services: servicesStr, budget, timeline, preferredDate, brief }),
    });

    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: "Confirmation de votre commission · EIDEN Group",
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
 *  SHARED EMAIL SHELL — Dark Editorial Edition
 *  Aesthetic: Mondrian clarity · Swiss grid ·
 *  Dark mode · Architectural borders
 * ════════════════════════════════════════════ */

type ShellContent = {
  preheader?: string;
  labelLeft: string;
  labelRight: string;
  body: string;
};

function emailShell(content: ShellContent): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

    body, table, td, a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    table {
      border-collapse: collapse !important;
    }

    .cta-btn:hover {
      background-color: #0C5657 !important;
      transition: background-color 0.3s ease !important;
    }
    .cta-btn-outline:hover {
      border-color: #CFC292 !important;
      color: #CFC292 !important;
      transition: all 0.3s ease !important;
    }
  </style>
  ${content.preheader ? `<!--[if !mso]><!--><div style="display:none;font-size:1px;color:#0E1B15;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${content.preheader}</div><!--<![endif]-->` : ""}
</head>
<body style="margin:0;padding:0;background-color:#0A120F;font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!--[if mso]>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A120F;"><tr><td align="center">
  <![endif]-->

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A120F;">
    <tr>
      <td align="center" style="padding:48px 16px;">

        <!-- CARD SHELL CONTAINER -->
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;border:1px solid #1A2A22;background-color:#0E1B15;">

          <!-- MONDRIAN PALETTE HEADER BARS — Dark Edition -->
          <tr>
            <td style="padding:0;font-size:1px;line-height:1px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
                <tr>
                  <td style="height:4px;background-color:#0E1B15;width:35%;padding:0;"></td>
                  <td style="height:4px;background-color:#0C5657;width:25%;padding:0;"></td>
                  <td style="height:4px;background-color:#CFC292;width:15%;padding:0;"></td>
                  <td style="height:4px;background-color:#E85D4A;width:15%;padding:0;"></td>
                  <td style="height:4px;background-color:#2B5C8F;width:10%;padding:0;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HEADER LABELS — Swiss Editorial -->
          <tr>
            <td style="padding:32px 40px 0;background-color:#0E1B15;">
              <table role="presentation" width="100%">
                <tr>
                  <td style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#CFC292;">
                    ${content.labelLeft}
                  </td>
                  <td align="right" style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#3A5A4D;">
                    ${content.labelRight}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- GRID DIVIDER — Architectural -->
          <tr>
            <td style="padding:20px 40px 0;background-color:#0E1B15;">
              <table role="presentation" width="100%">
                <tr>
                  <td style="height:1px;background-color:#1A2A22;font-size:1px;line-height:1px;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY CONTENT -->
          <tr>
            <td style="padding:0 40px;background-color:#0E1B15;">
              ${content.body}
            </td>
          </tr>

          <!-- SPACER BEFORE FOOTER -->
          <tr>
            <td style="height:40px;background-color:#0E1B15;font-size:1px;line-height:1px;"></td>
          </tr>

          <!-- FOOTER BLOCK — Architectural Border -->
          <tr>
            <td style="padding:32px 40px 36px;background-color:#0E1B15;border-top:2px solid #1A2A22;">
              <table role="presentation" width="100%">
                <tr>
                  <td style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;line-height:1.7;color:#3A5A4D;letter-spacing:0.5px;">
                    <strong style="color:#CFC292;font-weight:600;">EIDEN GROUP</strong><br />
                    Agadir Bay, Technopole<br />
                    Agadir, Maroc
                  </td>
                  <td align="right" style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;line-height:1.7;color:#3A5A4D;letter-spacing:0.3px;">
                    <a href="https://eiden-group.com" style="color:#0C5657;text-decoration:none;font-weight:600;">eiden-group.com</a><br />
                    <a href="mailto:contact@eiden-group.com" style="color:#3A5A4D;text-decoration:none;">contact@eiden-group.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BOTTOM MONDRIAN STRIP -->
          <tr>
            <td style="padding:0;font-size:1px;line-height:1px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
                <tr>
                  <td style="height:3px;background-color:#2B5C8F;width:10%;padding:0;"></td>
                  <td style="height:3px;background-color:#E85D4A;width:15%;padding:0;"></td>
                  <td style="height:3px;background-color:#CFC292;width:15%;padding:0;"></td>
                  <td style="height:3px;background-color:#0C5657;width:25%;padding:0;"></td>
                  <td style="height:3px;background-color:#0E1B15;width:35%;padding:0;"></td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

  <!--[if mso]>
  </td></tr></table>
  <![endif]-->

</body>
</html>`;
}

/* ════════════════════════════════════════════
 *  ADMIN EMAIL — Dark Editorial
 * ════════════════════════════════════════════ */

function buildAdminEmailHtml(data: {
  name: string; email: string; phone: string; company: string;
  services: string; budget: string; timeline: string; preferredDate: string; brief: string;
}): string {
  const { name, email, phone, company, services, budget, timeline, preferredDate, brief } = data;

  const rows = [
    { label: "Nom complet", value: escapeHtml(name), href: undefined },
    { label: "E-mail", value: escapeHtml(email), href: `mailto:${escapeHtml(email)}` },
    { label: "Téléphone", value: escapeHtml(phone), href: phone && phone !== "Non renseigné" ? `tel:${escapeHtml(phone)}` : undefined },
    { label: "Entreprise", value: escapeHtml(company), href: undefined },
    { label: "Services", value: escapeHtml(services), href: undefined },
    { label: "Budget", value: escapeHtml(budget), href: undefined },
    { label: "Horizon", value: escapeHtml(timeline), href: undefined },
    { label: "Date souhaitée", value: escapeHtml(preferredDate), href: undefined },
  ];

  const body = `
        <!-- SECTION LABEL -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
          <tr>
            <td>
              <p style="margin:0;font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#3A5A4D;">
                Commission · FIG. 01
              </p>
            </td>
          </tr>
        </table>

        <!-- HEADLINE -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
          <tr>
            <td>
              <h1 style="margin:0;font-family:'Fraunces',Georgia,serif;font-size:32px;font-weight:600;line-height:1.15;letter-spacing:-0.5px;color:#FAF9F6;">
                Nouvelle commission<span style="color:#E85D4A;">.</span>
              </h1>
              <p style="margin:14px 0 0;font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:#7A9A8D;">
                Un prospect a soumis une demande de projet depuis le catalogue de services.
              </p>
            </td>
          </tr>
        </table>

        <!-- DATA CARD — Dark Glass -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border:1px solid #1A2A22;background-color:#0A120F;border-collapse:collapse;">
          <tr>
            <td style="padding:4px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${rows.map((r) => `
                <tr>
                  <td style="padding:14px 24px;border-bottom:1px solid #1A2A22;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#3A5A4D;vertical-align:top;padding:2px 0;">
                          ${r.label}
                        </td>
                        <td style="font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:#FAF9F6;padding:2px 0;font-weight:500;">
                          ${r.href ? `<a href="${r.href}" style="color:#0C5657;text-decoration:none;border-bottom:1px solid rgba(12,86,87,0.4);">${r.value}</a>` : r.value}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `).join("")}
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="140" style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#3A5A4D;vertical-align:top;padding:2px 0;">
                          Brief
                        </td>
                        <td style="font-family:'Fraunces',Georgia,serif;font-size:15px;line-height:1.7;color:#FAF9F6;padding:2px 0;white-space:pre-wrap;font-style:italic;">
                          "${escapeHtml(brief)}"
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- REPLY BUTTON — Teal Accent -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
          <tr>
            <td align="left">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:9999px;background-color:#0C5657;" bgcolor="#0C5657">
                    <a href="mailto:${escapeHtml(email)}"
                       class="cta-btn"
                       style="display:inline-block;padding:14px 32px;font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#FAF9F6;text-decoration:none;border-radius:9999px;background-color:#0C5657;transition:background-color 0.3s ease;">
                      Répondre à cette demande →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
  `;

  return emailShell({
    preheader: `Nouvelle commission de ${name}${company && company !== "Non renseigné" ? ` (${company})` : ""}`,
    labelLeft: "EIDEN Group",
    labelRight: "Commission",
    body,
  });
}

/* ════════════════════════════════════════════
 *  VISITOR CONFIRMATION EMAIL — Dark Editorial
 * ════════════════════════════════════════════ */

function buildVisitorEmailHtml(name: string): string {
  const body = `
        <!-- SECTION LABEL — Swiss Style -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
          <tr>
            <td>
              <p style="margin:0;font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#3A5A4D;">
                Confirmation · FIG. 01
              </p>
            </td>
          </tr>
        </table>

        <!-- HEADLINE — Fraunces Display -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
          <tr>
            <td>
              <h1 style="margin:0;font-family:'Fraunces',Georgia,serif;font-size:36px;font-weight:400;line-height:1.15;letter-spacing:-0.5px;color:#FAF9F6;">
                Merci,<br />
                <span style="font-weight:600;color:#0C5657;">${escapeHtml(name)}</span><span style="color:#E85D4A;">.</span>
              </h1>
              <p style="margin:18px 0 0;font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#7A9A8D;">
                Votre demande de commission a bien été reçue. Un associé EIDEN
                lira personnellement votre brief et vous répondra sous
                <strong style="color:#CFC292;font-weight:600;">24 heures ouvrées</strong>.
              </p>
            </td>
          </tr>
        </table>

        <!-- STEPS CARD — Dark Glass with Teal Accent -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border:1px solid #1A2A22;background-color:#0A120F;border-collapse:collapse;">
          <tr>
            <td style="padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0;font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#3A5A4D;">
                      Prochaines étapes · 03
                    </p>
                  </td>
                </tr>
                ${[
                  "Un associé lit votre brief personnellement",
                  "Vous recevez une proposition adaptée sous 24h",
                  "Échange sans engagement"
                ].map((step, i) => `
                <tr>
                  <td style="padding:14px 0;border-bottom:${i < 2 ? "1px solid #1A2A22" : "none"};">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="40" style="vertical-align:middle;padding-right:14px;">
                          <span style="display:inline-block;width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;background-color:#0C5657;color:#FAF9F6;font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:600;">0${i + 1}</span>
                        </td>
                        <td style="font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;line-height:1.5;color:#FAF9F6;vertical-align:middle;">
                          ${step}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `).join("")}
              </table>
            </td>
          </tr>
        </table>

        <!-- METRICS STRIP — Landing Page Style -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border-top:1px solid #1A2A22;border-bottom:1px solid #1A2A22;">
          <tr>
            <td style="padding:20px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="text-align:center;border-right:1px solid #1A2A22;">
                    <p style="margin:0;font-family:'Fraunces',Georgia,serif;font-size:24px;font-weight:600;color:#CFC292;line-height:1;">24h</p>
                    <p style="margin:6px 0 0;font-family:'JetBrains Mono','Courier New',monospace;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#3A5A4D;">Réponse</p>
                  </td>
                  <td width="33%" style="text-align:center;border-right:1px solid #1A2A22;">
                    <p style="margin:0;font-family:'Fraunces',Georgia,serif;font-size:24px;font-weight:600;color:#CFC292;line-height:1;">30min</p>
                    <p style="margin:6px 0 0;font-family:'JetBrains Mono','Courier New',monospace;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#3A5A4D;">Appel découverte</p>
                  </td>
                  <td width="33%" style="text-align:center;">
                    <p style="margin:0;font-family:'Fraunces',Georgia,serif;font-size:24px;font-weight:600;color:#CFC292;line-height:1;">0€</p>
                    <p style="margin:6px 0 0;font-family:'JetBrains Mono','Courier New',monospace;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#3A5A4D;">Sans engagement</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA — Teal Solid -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
          <tr>
            <td align="left">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:9999px;background-color:#0C5657;" bgcolor="#0C5657">
                    <a href="https://eiden-group.com"
                       class="cta-btn"
                       style="display:inline-block;padding:14px 32px;font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#FAF9F6;text-decoration:none;border-radius:9999px;background-color:#0C5657;transition:background-color 0.3s ease;">
                      Découvrir nos services →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- SECONDARY CTA — Outline -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
          <tr>
            <td align="left">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:9999px;border:1px solid #3A5A4D;">
                    <a href="mailto:contact@eiden-group.com"
                       class="cta-btn-outline"
                       style="display:inline-block;padding:12px 28px;font-family:'Geist','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:#7A9A8D;text-decoration:none;border-radius:9999px;transition:all 0.3s ease;">
                      Une question ? Écrivez-nous
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
  `;

  return emailShell({
    preheader: `Merci ${name} — Votre commission a bien été reçue`,
    labelLeft: "EIDEN Group",
    labelRight: "Confirmation",
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
