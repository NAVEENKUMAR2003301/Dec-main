const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
const apiBaseUrl = configuredApiBaseUrl || "";
const backendUnavailableMessage = "Cannot reach the backend server. Start `npm run dev:server` and try again.";

const buildApiUrl = (path) => `${apiBaseUrl}${path}`;

const createHeaders = (options = {}) => {
    const headers = new Headers(options.headers || {});

    if (!headers.has("Accept")) {
        headers.set("Accept", "application/json");
    }

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    return headers;
};

const parseResponse = async (response) => {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        try {
            return await response.json();
        } catch {
            return null;
        }
    }

    try {
        const text = await response.text();
        return text.trim() || null;
    } catch {
        return null;
    }
};

const getErrorMessage = (payload) => {
    if (payload && typeof payload === "object" && typeof payload.message === "string") {
        return payload.message;
    }

    if (typeof payload === "string") {
        return payload;
    }

    return "";
};

const request = async (path, options = {}) => {
    let response;

    try {
        response = await fetch(buildApiUrl(path), {
            ...options,
            headers: createHeaders(options),
        });
    } catch {
        throw new Error(backendUnavailableMessage);
    }

    const payload = await parseResponse(response);

    if (!response.ok) {
        throw new Error(getErrorMessage(payload) || "The request could not be completed.");
    }

    return payload;
};

export const submitContactRequest = (formData) =>
    request("/api/contact-requests", {
        method: "POST",
        body: JSON.stringify(formData),
    });

export const submitConsultationBooking = (formData) =>
    request("/api/consultations", {
        method: "POST",
        body: JSON.stringify(formData),
    });

export const fetchConsultations = async (selectedDate) => {
    const result = await request(
        `/api/consultations?date=${encodeURIComponent(selectedDate)}`,
        {
            method: "GET",
        },
    );

    return Array.isArray(result?.items) ? result.items : [];
};
