// app/api/contact/route.ts
export async function POST(request: Request) {
    try {
      const body = await request.json().catch((err) => {
        console.error("JSON parse error:", err);
        return {};
      });
      
      console.log("Received contact form data:", JSON.stringify(body));
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
      } = body;

      const companySizeOptions = ["keine Mitarbeiter", "2-5", "6-10", "11-50", "51-200", "200+"] as const;
      const monthlyBudgetOptions = ["<500", "500-1500", "1500-5000", "5000+"] as const;

      const isNonEmptyString = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
      const trimString = (value: unknown) => (typeof value === "string" ? value.trim() : "");
      const isValidEmail = (emailValue: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim());
      const isValidPhoneNumber = (phoneNumberValue: string) => /^[0-9]{6,15}$/.test(phoneNumberValue.trim());
      const isValidCountryCode = (countryCodeValue: string) => /^[0-9]{1,4}$/.test(countryCodeValue.trim());

      const projectDescriptionValue = trimString(projectDescription) || trimString(message);
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

      if (!isNonEmptyString(roleInCompany)) {
        return Response.json(
          { error: "Rolle ist erforderlich" },
          { status: 400 }
        );
      }

      if (!isNonEmptyString(projectDescriptionValue)) {
        console.error("Validation error: ProjectDescription missing or invalid", { projectDescription, message });
        return Response.json(
          { error: "Projektbeschreibung ist erforderlich" },
          { status: 400 }
        );
      }

      if (!companySizeOptions.includes(companySize)) {
        return Response.json(
          { error: "Ungültige Unternehmensgröße" },
          { status: 400 }
        );
      }

      if (!monthlyBudgetOptions.includes(monthlyBudget)) {
        return Response.json(
          { error: "Ungültiges Budget" },
          { status: 400 }
        );
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
  
      // n8n Webhook URL aus Environment-Variable
      const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
      if (!webhookUrl) {
        console.error("N8N_CONTACT_WEBHOOK_URL nicht in .env konfiguriert");
        return Response.json(
          { error: "Kontakt-Service temporär nicht verfügbar" },
          { status: 500 }
        );
      }
  
      // Payload für n8n zusammenstellen
      const payload = {
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        roleInCompany: roleInCompany.trim(),
        companySize,
        monthlyBudget,
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

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken ? { "X-Admin-Token": adminToken } : {}),
        },
        body: JSON.stringify(payload),
      });
  
      // Fehlerbehandlung
      if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        console.error("n8n webhook error:", {
          status: res.status,
          statusText: res.statusText,
          error: errorText,
        });
  
        // Wenn n8n eine HTML-Fehlerseite zurückgibt (z. B. Workflow nicht aktiv)
        if (errorText.includes("<html") || errorText.includes("<!DOCTYPE")) {
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
  
      // Erfolgreiche Antwort von n8n
      const data = await res.json().catch(() => ({}));
      
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