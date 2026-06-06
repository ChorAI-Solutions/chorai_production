// app/api/contact/route.ts
export async function POST(request: Request) {
    try {
      const body = await request.json().catch((err) => {
        console.error("JSON parse error:", err);
        return {};
      });
      
      const requestId =
        typeof globalThis.crypto?.randomUUID === "function"
          ? globalThis.crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const {
        name,
        email,
        company,
        roleInCompany,
        companySize,
        phoneCountryCode,
        phoneNumber,
        monthlyBudget,
        projectDescription,
        honeypot,
        // backwards compatibility
        message,
        clientRequestId,
      } = body;

      console.log("Contact submission received", {
        requestId,
        email: typeof email === "string" ? email : undefined,
        company: typeof company === "string" ? company : undefined,
        hasHoneypot: typeof honeypot === "string" && honeypot.trim().length > 0,
      });

      // #region agent log
      fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "debug-session",
          runId: "chrome-repro",
          hypothesisId: "H3",
          location: "app/api/contact/route.ts:POST",
          message: "api_contact_entry",
          data: {
            requestId,
            clientRequestId: typeof clientRequestId === "string" ? clientRequestId : undefined,
            host: request.headers.get("host"),
            forwardedHost: request.headers.get("x-forwarded-host"),
            forwardedProto: request.headers.get("x-forwarded-proto"),
            userAgent: request.headers.get("user-agent")?.slice(0, 80),
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log

      // We accept both the "full" contact form (with segmentation fields) and a compact version used on solution subpages.
      // Compact version sends placeholders for role/companySize/monthlyBudget when the user only filled name/email/company/message.
      const companySizeOptions = ["keine Mitarbeiter", "2-5", "6-10", "11-50", "51-200", "200+", "nicht angegeben"] as const;
      const monthlyBudgetOptions = ["<500", "500-1500", "1500-5000", "5000+", "nicht angegeben"] as const;

      const isNonEmptyString = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
      const trimString = (value: unknown) => (typeof value === "string" ? value.trim() : "");
      const isValidEmail = (emailValue: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim());
      const isValidPhoneNumber = (phoneNumberValue: string) => /^[0-9]{6,15}$/.test(phoneNumberValue.trim());
      const isValidCountryCode = (countryCodeValue: string) => /^[0-9]{1,4}$/.test(countryCodeValue.trim());

      const projectDescriptionValue = trimString(projectDescription) || trimString(message);
      const roleInCompanyValue = trimString(roleInCompany) || "nicht angegeben";
      const companySizeValue = companySizeOptions.includes(companySize) ? companySize : "nicht angegeben";
      const monthlyBudgetValue = monthlyBudgetOptions.includes(monthlyBudget) ? monthlyBudget : "nicht angegeben";
      const phoneCountryCodeValue = trimString(phoneCountryCode) || "49";
      const phoneNumberValue = trimString(phoneNumber);
      const phoneValue = phoneNumberValue.length > 0 ? `+${phoneCountryCodeValue} ${phoneNumberValue}` : "";
  
      // Validierung: Pflichtfelder prüfen
      if (!isNonEmptyString(name)) {
        console.error("Validation error: Name missing or invalid", { name, type: typeof name });
        return Response.json(
          { error: "Name ist erforderlich" },
          { status: 400 }
        );
      }
  
      if (!isNonEmptyString(email)) {
        console.error("Validation error: Email missing or invalid", { email, type: typeof email });
        return Response.json(
          { error: "E-Mail-Adresse ist erforderlich" },
          { status: 400 }
        );
      }

      if (!isValidEmail(email)) {
        return Response.json(
          { error: "Ungültige E-Mail-Adresse" },
          { status: 400 }
        );
      }

      if (!isNonEmptyString(company)) {
        return Response.json(
          { error: "Unternehmen ist erforderlich" },
          { status: 400 }
        );
      }

      // roleInCompany is required in the full form, but compact pages send "nicht angegeben"
      if (!isNonEmptyString(roleInCompanyValue)) {
        return Response.json({ error: "Rolle ist erforderlich" }, { status: 400 });
      }

      if (!isNonEmptyString(projectDescriptionValue)) {
        console.error("Validation error: ProjectDescription missing or invalid", { projectDescription, message });
        return Response.json(
          { error: "Projektbeschreibung ist erforderlich" },
          { status: 400 }
        );
      }

      if (!companySizeOptions.includes(companySizeValue)) {
        return Response.json({ error: "Ungültige Unternehmensgröße" }, { status: 400 });
      }

      if (!monthlyBudgetOptions.includes(monthlyBudgetValue)) {
        return Response.json({ error: "Ungültiges Budget" }, { status: 400 });
      }

      // optional: honeypot (Spam)
      if (isNonEmptyString(honeypot)) {
        return Response.json(
          { error: "Ungültige Anfrage" },
          { status: 400 }
        );
      }

      // optional: phone
      if (phoneNumberValue.length > 0) {
        if (!isValidPhoneNumber(phoneNumberValue)) {
          return Response.json(
            { error: "Ungültige Telefonnummer" },
            { status: 400 }
          );
        }
        if (!isValidCountryCode(phoneCountryCodeValue)) {
          return Response.json(
            { error: "Ungültige Landesvorwahl" },
            { status: 400 }
          );
        }
      }
  
      // n8n Webhook URL aus Environment-Variable (fallback)
      const webhookUrl =
        process.env.N8N_CONTACT_WEBHOOK_URL ?? "https://n8n.chorai.de/webhook/vertriebsfilter";
  
      // Payload für n8n zusammenstellen
      const payload = {
        requestId,
        clientRequestId: typeof clientRequestId === "string" ? clientRequestId : undefined,
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        roleInCompany: roleInCompanyValue,
        companySize: companySizeValue,
        monthlyBudget: monthlyBudgetValue,
        phone: phoneValue,
        phoneCountryCode: phoneCountryCodeValue,
        phoneNumber: phoneNumberValue,
        projectDescription: projectDescriptionValue,
        // backwards compatibility for existing n8n workflow mapping:
        message: projectDescriptionValue,
        timestamp: new Date().toISOString(),
        source: "contact-form",
      };
  
      // Request an n8n Webhook senden
      const adminToken = process.env.ADMIN_TOKEN;

      const requestTimeoutMs = 12_000;
      const requestAbortController = new AbortController();
      const requestTimeout = setTimeout(() => requestAbortController.abort(), requestTimeoutMs);

      const webhookStartMs = Date.now();
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken ? { "X-Admin-Token": adminToken } : {}),
        },
        body: JSON.stringify(payload),
        signal: requestAbortController.signal,
      }).finally(() => clearTimeout(requestTimeout));

      const responseText = await res.text().catch(() => "");
      const webhookDurationMs = Date.now() - webhookStartMs;
  
      // Fehlerbehandlung
      if (!res.ok) {
        console.error("n8n webhook error:", {
          requestId,
          webhookUrl,
          status: res.status,
          statusText: res.statusText,
          error: responseText,
        });
        // #region agent log
        fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: "debug-session",
            runId: "chrome-repro",
            hypothesisId: "H3",
            location: "app/api/contact/route.ts:POST",
            message: "webhook_error",
            data: {
              requestId,
              clientRequestId: typeof clientRequestId === "string" ? clientRequestId : undefined,
              status: res.status,
              webhookDurationMs,
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion agent log
  
        // Wenn n8n eine HTML-Fehlerseite zurückgibt (z. B. Workflow nicht aktiv)
        if (responseText.includes("<html") || responseText.includes("<!DOCTYPE")) {
          return Response.json(
            {
              error: "Kontakt-Service nicht verfügbar",
              details: "Bitte versuchen Sie es später erneut",
            },
            { status: 503 }
          );
        }
  
        return Response.json(
          {
            error: "Fehler beim Senden der Nachricht",
            details: "Bitte versuchen Sie es später erneut",
          },
          { status: 500 }
        );
      }
  
      console.log("n8n webhook ok", {
        requestId,
        webhookUrl,
        status: res.status,
        responseSnippet: responseText.slice(0, 200),
      });
      // #region agent log
      fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "debug-session",
          runId: "chrome-repro",
          hypothesisId: "H3",
          location: "app/api/contact/route.ts:POST",
          message: "webhook_ok",
          data: {
            requestId,
            clientRequestId: typeof clientRequestId === "string" ? clientRequestId : undefined,
            status: res.status,
            webhookDurationMs,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log
      
      return Response.json(
        {
          success: true,
          message: "Vielen Dank für Ihre Anfrage! Wir melden uns schnellstmöglich bei Ihnen.",
        },
        { status: 200 }
      );
    } catch (error) {
      // Unerwartete Fehler abfangen
      console.error("Contact API error:", error);
      return Response.json(
        {
          error: "Interner Serverfehler",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  }