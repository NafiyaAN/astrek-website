import { FormEvent, useEffect, useState } from "react";

import type { Locale } from "./i18n";
import { submitPartnership } from "./forms-api";
import { MechChrome } from "./MechChrome";
import { PARTNERSHIP_INTERESTS, PARTNERSHIP_TYPES } from "./partnership-options";
import { translate as tr } from "./translations";
import "./mech-mirror/emergent-teal.css";
import "./mech-mirror/astrek-neura.css";
import "./mech-mirror/astrek-journey-nav.css";
import "./mech-mirror/astrek-nav-fix.css";
import "./mech-mirror/astrek-responsive-polish.css";
import "./mech-mirror/astrek-partnership.css";

const emptyForm = {
  name: "",
  company: "",
  designation: "",
  email: "",
  phone: "",
  partnershipType: "",
  areaOfInterest: "",
  message: "",
};

export function PartnershipPage({ locale }: { locale: Locale }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.body.classList.add("ptr-route");
    const markHeader = () => {
      document
        .querySelectorAll<HTMLElement>("[data-testid='site-header']")
        .forEach((header) => header.classList.add("is-scrolled"));
    };
    markHeader();
    const timer = window.setTimeout(markHeader, 50);
    const timer2 = window.setTimeout(markHeader, 300);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(timer2);
      document.body.classList.remove("ptr-route");
    };
  }, []);

  const setField = (key: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const entry = {
      name: form.name.trim(),
      company: form.company.trim(),
      designation: form.designation.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      partnershipType: form.partnershipType.trim(),
      areaOfInterest: form.areaOfInterest.trim(),
      message: form.message.trim(),
    };

    if (
      !entry.name ||
      !entry.company ||
      !entry.designation ||
      !entry.email ||
      !entry.phone ||
      !entry.partnershipType ||
      !entry.areaOfInterest ||
      !entry.message
    ) {
      setError(true);
      setStatus(tr(locale, "Please complete the required fields."));
      return;
    }

    setSending(true);
    setError(false);
    setStatus(tr(locale, "Sending…"));

    try {
      await submitPartnership(entry);
      setForm(emptyForm);
      setStatus(tr(locale, "Thank you. Your partnership enquiry has been sent to the Astrek team."));
    } catch {
      setError(true);
      setStatus(tr(locale, "Something went wrong. Please email info@astrekinnovations.com directly."));
    } finally {
      setSending(false);
    }
  };

  return (
    <MechChrome locale={locale}>
      <section
        id="partner"
        data-testid="partnership-section"
        className="ptr-page"
        aria-labelledby="partnership-title"
      >
        <div className="ptr-wrap">
          <div className="ptr-layout">
            <aside className="ptr-intro">
              <p className="ptr-kicker">{tr(locale, "Partnership")}</p>
              <h1 id="partnership-title" className="ptr-title">
                {tr(locale, "Let’s Build the Future of Rehabilitation")}
              </h1>
              <p className="ptr-lead">{tr(locale, "Take your first step, again!")}</p>
              <p className="ptr-blurb">
                {tr(
                  locale,
                  "Astrek Innovations builds lower-limb exoskeletons for rehabilitation and mobility support — validated in real-world pilots and recognized through innovation awards.",
                )}
              </p>

              <ul className="ptr-points">
                <li>{tr(locale, "Learn more about UNIKEXO")}</li>
                <li>{tr(locale, "Request a demo or collaboration")}</li>
                <li>{tr(locale, "Explore partnership opportunities")}</li>
              </ul>

              <div className="ptr-contact">
                <p className="ptr-contact__label">{tr(locale, "Talk to us")}</p>
                <a href="mailto:info@astrekinnovations.com">info@astrekinnovations.com</a>
                <a href="tel:+971503531304">+971 50 353 1304</a>
                <p className="ptr-contact__addr">
                  {tr(
                    locale,
                    "106-OD4, Office 2201, Floor 22, Sky Tower, Abu Dhabi, United Arab Emirates",
                  )}
                </p>
              </div>
            </aside>

            <div className="ptr-card">
              <div className="ptr-card__head">
                <h2 className="ptr-card__title">{tr(locale, "Partner With Us")}</h2>
                <p className="ptr-card__sub">
                  {tr(locale, "Tell us about your organisation and how you’d like to work together.")}
                </p>
              </div>

              <form
                className="ptr-form"
                id="partnerEnquiryForm"
                data-testid="partner-enquiry-form"
                onSubmit={onSubmit}
                noValidate
              >
                <div className="ptr-grid">
                  <label className="ptr-field">
                    <span>{tr(locale, "Name")}</span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                    />
                  </label>
                  <label className="ptr-field">
                    <span>{tr(locale, "Company / Organization")}</span>
                    <input
                      type="text"
                      name="company"
                      autoComplete="organization"
                      required
                      value={form.company}
                      onChange={(e) => setField("company", e.target.value)}
                    />
                  </label>
                  <label className="ptr-field">
                    <span>{tr(locale, "Designation")}</span>
                    <input
                      type="text"
                      name="designation"
                      autoComplete="organization-title"
                      required
                      value={form.designation}
                      onChange={(e) => setField("designation", e.target.value)}
                    />
                  </label>
                  <label className="ptr-field">
                    <span>{tr(locale, "Email")}</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                    />
                  </label>
                  <label className="ptr-field">
                    <span>{tr(locale, "Phone Number")}</span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                    />
                  </label>
                  <label className="ptr-field">
                    <span>{tr(locale, "Partnership Type")}</span>
                    <select
                      name="partnershipType"
                      required
                      value={form.partnershipType}
                      onChange={(e) => setField("partnershipType", e.target.value)}
                    >
                      <option value="">{tr(locale, "Select an option")}</option>
                      {PARTNERSHIP_TYPES.map((value) => (
                        <option key={value} value={value}>
                          {tr(locale, value)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="ptr-field ptr-field--full">
                    <span>{tr(locale, "Area of Interest")}</span>
                    <select
                      name="areaOfInterest"
                      required
                      value={form.areaOfInterest}
                      onChange={(e) => setField("areaOfInterest", e.target.value)}
                    >
                      <option value="">{tr(locale, "Select an option")}</option>
                      {PARTNERSHIP_INTERESTS.map((value) => (
                        <option key={value} value={value}>
                          {tr(locale, value)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="ptr-field ptr-field--full">
                    <span>{tr(locale, "Message / Requirements")}</span>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                    />
                  </label>
                </div>
                <div className="ptr-actions">
                  <button type="submit" className="ptr-submit" disabled={sending}>
                    {sending ? tr(locale, "Sending…") : tr(locale, "Submit enquiry")}
                  </button>
                </div>
                {status ? (
                  <p className="ptr-status" data-tone={error ? "error" : "ok"}>
                    {status}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>
    </MechChrome>
  );
}
