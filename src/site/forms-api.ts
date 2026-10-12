type EnquiryPayload = {
  name: string;
  email: string;
  organisation?: string;
  subject?: string;
  message: string;
};

type NewsletterPayload = {
  email: string;
};

export type PartnershipPayload = {
  name: string;
  company: string;
  designation?: string;
  email: string;
  phone?: string;
  partnershipType: string;
  areaOfInterest: string;
  message: string;
};

const contactEndpoint = import.meta.env.VITE_FORMSPREE_CONTACT_URL as string | undefined;
const newsletterEndpoint = import.meta.env.VITE_FORMSPREE_NEWSLETTER_URL as string | undefined;
const partnershipEndpoint = import.meta.env.VITE_FORMSPREE_PARTNERSHIP_URL as string | undefined;

function persistLocal(key: string, entry: Record<string, unknown>) {
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  list.unshift(entry);
  localStorage.setItem(key, JSON.stringify(list));
}

async function postJson(url: string, data: Record<string, string>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Form submit failed (${res.status})`);
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<"remote" | "local"> {
  const entry = {
    id: `enq_${Date.now()}`,
    ...payload,
    date: new Date().toISOString(),
    read: false,
  };

  if (contactEndpoint) {
    await postJson(contactEndpoint, {
      name: payload.name,
      email: payload.email,
      organisation: payload.organisation || "",
      subject: payload.subject || "",
      message: payload.message,
      _subject: "Astrek website enquiry",
    });
    return "remote";
  }

  persistLocal("astrek_enquiries", entry);
  return "local";
}

export async function submitPartnership(payload: PartnershipPayload): Promise<"remote" | "local"> {
  const composedMessage = [
    payload.message,
    "",
    "— Partnership details —",
    `Company / Organization: ${payload.company}`,
    `Designation: ${payload.designation || "—"}`,
    `Phone: ${payload.phone || "—"}`,
    `Partnership type: ${payload.partnershipType}`,
    `Area of interest: ${payload.areaOfInterest}`,
  ].join("\n");

  const entry = {
    id: `ptr_${Date.now()}`,
    type: "partnership",
    name: payload.name,
    email: payload.email,
    organisation: payload.company,
    company: payload.company,
    designation: payload.designation || "",
    phone: payload.phone || "",
    partnershipType: payload.partnershipType,
    areaOfInterest: payload.areaOfInterest,
    subject: `Partnership enquiry — ${payload.partnershipType}`,
    message: composedMessage,
    date: new Date().toISOString(),
    read: false,
    team: "partnerships",
  };

  persistLocal("astrek_partnerships", entry);
  persistLocal("astrek_enquiries", entry);

  const endpoint = partnershipEndpoint || contactEndpoint;
  if (endpoint) {
    await postJson(endpoint, {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      organisation: payload.company,
      designation: payload.designation || "",
      phone: payload.phone || "",
      partnershipType: payload.partnershipType,
      areaOfInterest: payload.areaOfInterest,
      message: composedMessage,
      form: "partnership",
      team: "Partnerships",
      _replyto: payload.email,
      _subject: `Astrek partnership enquiry — ${payload.partnershipType}`,
    });
    return "remote";
  }

  return "local";
}

export async function submitNewsletter(payload: NewsletterPayload): Promise<"remote" | "local"> {
  if (newsletterEndpoint) {
    await postJson(newsletterEndpoint, {
      email: payload.email,
      _subject: "Astrek newsletter signup",
    });
    return "remote";
  }

  const list = JSON.parse(localStorage.getItem("astrek_newsletter") || "[]");
  list.unshift({ email: payload.email, date: new Date().toISOString() });
  localStorage.setItem("astrek_newsletter", JSON.stringify(list));
  return "local";
}
