const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Safely parse response — handles empty bodies and non-JSON responses.
 */
const safeJson = async (response) => {
  const text = await response.text();

  if (!text || text.trim() === "") {
    throw new Error(
      `Server returned an empty response (status ${response.status}). Please try again.`,
    );
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `Unexpected server response (status ${response.status}). Please try again later.`,
    );
  }
};

/**
 * Submit a contact request form.
 * Used by: ContactPage.jsx
 */
export const submitContactRequest = async (formData) => {
  let response;

  try {
    response = await fetch(`${BASE_URL}/api/contact-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch {
    throw new Error(
      "Unable to reach the server. Please check your connection and try again.",
    );
  }

  const data = await safeJson(response);

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}.`,
    );
  }

  return data;
};

/**
 * Fetch consultations filtered by date (YYYY-MM-DD).
 * Used by: BookConsultation.jsx → fetchConsultations(date)
 */
export const fetchConsultations = async (date = "") => {
  const url = date
    ? `${BASE_URL}/api/consultations?date=${encodeURIComponent(date)}`
    : `${BASE_URL}/api/consultations`;

  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error("Unable to reach the server.");
  }

  const data = await safeJson(response);

  if (!response.ok) {
    throw new Error(data.message || "Failed to load consultations.");
  }

  return data.items || [];
};

/**
 * Submit a consultation booking.
 * Used by: BookConsultation.jsx → submitConsultationBooking(payload)
 */
export const submitConsultationBooking = async (formData) => {
  let response;

  try {
    response = await fetch(`${BASE_URL}/api/consultations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch {
    throw new Error(
      "Unable to reach the server. Please check your connection and try again.",
    );
  }

  const data = await safeJson(response);

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}.`,
    );
  }

  return data;
};

/**
 * Fetch all contact requests (admin use).
 */
export const getContactRequests = async () => {
  let response;

  try {
    response = await fetch(`${BASE_URL}/api/contact-requests`);
  } catch {
    throw new Error("Unable to reach the server.");
  }

  const data = await safeJson(response);

  if (!response.ok) {
    throw new Error(data.message || "Failed to load contact requests.");
  }

  return data.items || [];
};

/**
 * Health check.
 */
export const checkHealth = async () => {
  let response;

  try {
    response = await fetch(`${BASE_URL}/api/health`);
  } catch {
    throw new Error("Server is unreachable.");
  }

  return safeJson(response);
};
