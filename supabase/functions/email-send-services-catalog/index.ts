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

/* ─────────────────────────────────────────────
 *  SHARED EMAIL SHELL
 * ───────────────────────────────────────────── */

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
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  ${content.preheader ? `<!--[if !mso]><!--><div style="display:none;font-size:1px;color:#f7f5f0;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${content.preheader}</div><!--<![endif]-->` : ""}
</head>
<body style="margin:0;padding:0;background-color:#f7f5f0;font-family:Georgia,'Times New Roman',serif;">

  <!--[if mso]>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f5f0;"><tr><td align="center">
  <![endif]-->

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f5f0;">
    <tr>
      <td align="center" style="padding:48px 16px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- MONDRIAAN BARS -->
          <tr>
            <td style="padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="height:5px;background-color:#0C5657;width:75%;"></td>
                  <td style="height:5px;background-color:#CFC292;width:25%;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HEADER -->
          <tr>
            <td style="padding:32px 36px 0;background-color:#f7f5f0;">
              <table role="presentation" width="100%">
                <tr>
                  <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#0C5657;">
                    ${content.labelLeft}
                  </td>
                  <td align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:#9b8c6b;">
                    ${content.labelRight}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:16px 36px 0;background-color:#f7f5f0;">
              <table role="presentation" width="100%"><tr><td style="height:1px;background-color:#0C5657;opacity:0.12;"></td></tr></table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:0 36px;background-color:#f7f5f0;">
              ${content.body}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:0 36px 40px;background-color:#f7f5f0;">
              <table role="presentation" width="100%"><tr><td style="height:1px;background-color:#CFC292;opacity:0.3;"></td></tr></table>
              <table role="presentation" width="100%" style="margin-top:20px;">
                <tr>
                  <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;line-height:1.6;color:#9b8c6b;letter-spacing:0.3px;">
                    <strong style="color:#0C5657;">EIDEN GROUP</strong><br />
                    Agadir Bay, Technopole<br />
                    Agadir, Maroc
                  </td>
                  <td align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;line-height:1.6;color:#9b8c6b;">
                    <a href="https://eiden-group.com" style="color:#0C5657;text-decoration:none;font-weight:500;">eiden-group.com</a><br />
                    <a href="mailto:contact@eiden-group.com" style="color:#9b8c6b;text-decoration:none;">contact@eiden-group.com</a>
                  </td>
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

/* ─────────────────────────────────────────────
 *  ADMIN EMAIL
 * ───────────────────────────────────────────── */

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
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr>
            <td>
              <h1 style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:21px;font-weight:700;letter-spacing:-0.4px;color:#1a2e2b;">
                Nouvelle commission
              </h1>
              <p style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.7;color:#4a5552;">
                Un prospect a soumis une demande depuis le catalogue de services.
              </p>
            </td>
          </tr>
        </table>

        <!-- DATA CARD -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
          <tr>
            <td style="background-color:#efece4;border-radius:8px;padding:4px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${rows.map((r) => `
                <tr>
                  <td style="padding:12px 24px;border-bottom:1px solid rgba(12,86,87,0.06);">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="130" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:#9b8c6b;vertical-align:top;padding:2px 0;">
                          ${r.label}
                        </td>
                        <td style="font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.5;color:#1a2e2b;padding:2px 0;">
                          ${r.href ? `<a href="${r.href}" style="color:#0C5657;text-decoration:none;border-bottom:1px solid rgba(12,86,87,0.15);">${r.value}</a>` : r.value}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `).join("")}
                <tr>
                  <td style="padding:16px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="130" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:#9b8c6b;vertical-align:top;padding:2px 0;">
                          Brief
                        </td>
                        <td style="font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.7;color:#1a2e2b;padding:2px 0;white-space:pre-wrap;">
                          ${escapeHtml(brief)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- REPLY BUTTON -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:50px;background-color:#0C5657;" bgcolor="#0C5657">
                    <a href="mailto:${escapeHtml(email)}"
                       style="display:inline-block;padding:14px 36px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.5px;color:#f7f5f0;text-decoration:none;border-radius:50px;">
                      Répondre à cette demande →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- RED ACCENT DOT -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
          <tr>
            <td align="right">
              <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background-color:#E85D4A;"></span>
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

/* ─────────────────────────────────────────────
 *  VISITOR CONFIRMATION EMAIL
 * ───────────────────────────────────────────── */

function buildVisitorEmailHtml(name: string): string {
  const body = `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr>
            <td>
              <h1 style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:26px;font-weight:300;letter-spacing:-0.5px;color:#1a2e2b;">
                Merci,<br />
                <span style="font-weight:600;">${escapeHtml(name)}</span>.
              </h1>
              <p style="margin:16px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.8;color:#4a5552;">
                Votre demande de commission a bien été reçue. Un associé EIDEN
                lira personnellement votre brief et vous répondra sous
                <strong style="color:#1a2e2b;">24 heures ouvrées</strong>.
              </p>
            </td>
          </tr>
        </table>

        <!-- STEPS CARD -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
          <tr>
            <td style="background-color:#efece4;border-radius:8px;padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#9b8c6b;">
                      Prochaines étapes
                    </p>
                  </td>
                </tr>
                ${[
                  "Un associé lit votre brief personnellement",
                  "Vous recevez une proposition adaptée sous 24h",
                  "Échange sans engagement"
                ].map((step, i) => `
                <tr>
                  <td style="padding:8px 0;border-bottom:${i < 2 ? "1px solid rgba(12,86,87,0.06)" : "none"};">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="28" style="vertical-align:top;padding:2px 0;">
                          <span style="display:inline-block;width:18px;height:18px;line-height:18px;text-align:center;border-radius:50%;background-color:#0C5657;color:#f7f5f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:600;">${i + 1}</span>
                        </td>
                        <td style="font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.6;color:#4a5552;padding:2px 0;">
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

        <!-- CTA -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:50px;background-color:#0C5657;" bgcolor="#0C5657">
                    <a href="https://eiden-group.com"
                       style="display:inline-block;padding:14px 36px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.5px;color:#f7f5f0;text-decoration:none;border-radius:50px;">
                      Découvrir nos services →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- RED ACCENT DOT -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
          <tr>
            <td align="right">
              <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background-color:#E85D4A;"></span>
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
