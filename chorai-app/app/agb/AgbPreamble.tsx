export function AgbPreamble() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-2 text-slate-100">PRÄAMBEL &amp; LEISTUNGSBESCHREIBUNG</h2>
      <p className="text-sm text-slate-300/80 mb-4">(Bitte vor Vertragsunterzeichnung lesen)</p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-slate-100">1. Das Konzept: „Managed Self-Hosting“ (Was wir tun)</h3>
      <p>
        ChorAI bietet eine spezialisierte Form der Prozessautomatisierung an. Anders als bei klassischen Cloud-Diensten (SaaS)
        bauen wir Ihre eigene Infrastruktur. Wir agieren dabei wie ein Architekt und Hausmeister: Wir planen und bauen das
        „digitale Haus“ (den Server und die Software) auf Ihrem Grundstück (Ihrem Mietserver). Danach übergeben wir Ihnen den
        Schlüssel.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-slate-100">2. Abgrenzung der Verantwortlichkeiten</h3>
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-slate-100">A) Rolle von ChorAI (Auftragnehmer):</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Einrichtung:</strong> Wir installieren eine betriebsfertige Software-Umgebung zur Automatisierung (Workflows,
              Datenbanken, Schnittstellen) auf Ihrem Server.
            </li>
            <li>
              <strong>Wartung (nur bei Buchung):</strong> Wir kümmern uns um technische Updates, Sicherheits-Patches und die
              Verfügbarkeit der installierten Dienste in regelmäßigen Intervallen.
            </li>
            <li>
              <strong>Dienstleistung:</strong> Wir schulden die fachgerechte Installation und – im Wartungsfall – das Bemühen um
              einen störungsfreien Betrieb.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-100">B) Rolle des Kunden (Auftraggeber):</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Infrastruktur:</strong> Sie mieten den Server (z.B. bei Hetzner) und schließen die Verträge für notwendige
              Zusatzdienste (z.B. OpenAI für KI, Twilio für Telefonie) im eigenen Namen ab.
            </li>
            <li>
              <strong>Kosten:</strong> Sie tragen die laufenden Kosten für diese Drittanbieter direkt.
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-slate-100">
        3. Risikohinweis: Open Source &amp; Drittanbieter-APIs (Haftungsausschluss)
      </h3>
      <p>
        Unsere Lösungen basieren auf Schnittstellen zu Drittanbietern (z.B. OpenAI, Google) und Open-Source-Softwarekomponenten.
        Hierbei gilt:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Externe Änderungen (&quot;Breaking Changes&quot;):</strong> Anbieter wie OpenAI oder Software-Communities entwickeln
          ihre Produkte stetig weiter. Es kann vorkommen, dass eine externe Partei eine Schnittstelle ändert oder abschaltet,
          sodass ein Workflow nicht mehr funktioniert.
        </li>
        <li>
          <strong>Keine Haftung für Externe:</strong> Da ChorAI keinen Einfluss auf die Entwicklung dieser Fremdsoftware hat, haften
          wir nicht für Funktionsstörungen, die durch Updates, API-Änderungen oder Inkompatibilitäten von Drittanbietern entstehen.
        </li>
        <li>
          <strong>Reparatur:</strong> Die Anpassung der Workflows an solche externen Änderungen ist nicht Teil der Gewährleistung,
          sondern eine kostenpflichtige Dienstleistung (oder Teil eines Premium-Wartungspakets, sofern explizit vereinbart).
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-slate-100">4. Umfang der Wartung (Realitäts-Check)</h3>
      <p>Sofern ein Wartungsvertrag geschlossen wurde, bedeutet dies:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Intervall:</strong> Wir prüfen die Systeme in regelmäßigen Abständen (stichprobenartig/periodisch) auf Updates und
          Funktion.
        </li>
        <li>
          <strong>Kein 24/7 Monitoring:</strong> Wir schulden keine lückenlose Echtzeit-Überwachung jeder einzelnen Workflow-Ausführung
          rund um die Uhr.
        </li>
        <li>
          <strong>Reaktion:</strong> Störungen werden im Rahmen der üblichen Geschäftszeiten bearbeitet.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-slate-100">5. Was NICHT Teil der Leistung ist</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Kein Hardware-Verkauf:</strong> Wir verkaufen keine Server.
        </li>
        <li>
          <strong>Keine inhaltliche Haftung für KI:</strong> Wenn wir KI-Modelle anbinden, haftet ChorAI nicht für deren Aussagen
          (&quot;Halluzinationen&quot;).
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-slate-100">6. Der Ablauf der Zusammenarbeit</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Setup (Werkvertrag):</strong> Wir richten Ihr System ein. Nach erfolgreichem Funktionstest nehmen Sie das System ab.
          Damit endet die Einrichtungsphase.
        </li>
        <li>
          <strong>Betrieb (Dienstvertrag):</strong> Wenn Sie das Wartungspaket gebucht haben, betreuen wir Ihr System gemäß § 4.
        </li>
        <li>
          <strong>Ohne Wartung:</strong> Ohne Wartungspaket übergeben wir Ihnen das System auf dem aktuellen Stand. Für zukünftige
          Ausfälle durch veraltete Software oder API-Änderungen übernimmt ChorAI keine Haftung.
        </li>
      </ul>
    </section>
  );
}





