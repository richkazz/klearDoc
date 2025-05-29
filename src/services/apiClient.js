// src/services/apiClient.js
import { API_BASE_URL } from "../config";

/**
 * Generic fetch wrapper for calling your backend API with JSON request/response.
 * Automatically includes credentials (cookies) for cross-site requests.
 * @param {string} endpoint - The API endpoint (e.g., "interview/analyze-cv").
 * @param {object} [options={}] - Fetch options (body, headers, etc.).
 * @param {string} [method="POST"] - HTTP method.
 * @returns {Promise<any>} - The response from the API, parsed based on Content-Type.
 */
export async function fetchFromBackend(
  endpoint,
  options = {},
  method = "POST"
) {
  const { body, headers: customHeaders = {}, ...restOptions } = options;

  const defaultHeaders = {
    Accept: "application/json, text/markdown, text/plain",
  };

  const fetchOptions = {
    method,
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
    credentials: "include", // ensure cookies are sent and stored
    ...restOptions,
  };

  if (body && !["GET", "HEAD"].includes(method.toUpperCase())) {
    fetchOptions.headers["Content-Type"] = "application/json";
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(
      `${API_BASE_URL.replace(/\/+$/g, "")}/${endpoint.replace(/^\/+/, "")}`,
      fetchOptions
    );

    if (!response.ok) {
      let errorMessage = `API request to ${endpoint} failed with status ${response.status}`;
      let errorDetails = null;
      try {
        const errorBodyText = await response.text();
        if (errorBodyText) {
          errorDetails = JSON.parse(errorBodyText);
          errorMessage += `: ${
            errorDetails.title ||
            errorDetails.message ||
            JSON.stringify(errorDetails)
          }`;
        } else {
          errorMessage += `: ${response.statusText}`;
        }
      } catch {
        errorMessage += `: ${response.statusText}`;
      }
      console.error(errorMessage, {
        endpoint,
        options: fetchOptions,
        errorDetails,
      });
      const apiError = new Error(errorMessage);
      apiError.details = errorDetails;
      apiError.status = response.status;
      throw apiError;
    }

    const contentType = response.headers.get("content-type") || "";
    if (response.status === 204) {
      return null;
    }

    if (contentType.includes("application/json")) {
      return await response.json();
    }
    if (
      contentType.includes("text/markdown") ||
      contentType.includes("text/plain")
    ) {
      return await response.text();
    }

    // Fallback: try parsing as JSON, else return text
    const textContent = await response.text();
    if (textContent) {
      try {
        return JSON.parse(textContent);
      } catch {
        console.warn(
          `Received OK response from ${endpoint} with Content-Type '${contentType}' but couldn't parse as JSON. Returning as text.`
        );
        return textContent;
      }
    }

    return null;
  } catch (err) {
    if (!err.message.startsWith("API request to")) {
      console.error(`Network or other error calling ${endpoint}:`, err);
    }
    throw err;
  }
}

/**
 * Fetches data from backend using multipart/form-data (for file uploads).
 * Automatically includes credentials (cookies) for cross-site requests.
 * @param {string} endpoint - The API endpoint path.
 * @param {FormData} formData - The FormData object.
 * @param {object} [options={}] - Additional fetch options.
 * @returns {Promise<any>} - The response from the backend.
 */
export async function fetchWithFormData(endpoint, formData, options = {}) {
  const { headers: customHeaders = {}, ...restOptions } = options;

  const defaultHeaders = {
    Accept: "application/json, text/plain",
  };

  const fetchOptions = {
    method: "POST",
    body: formData,
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
    credentials: "include", // ensure cookies are sent and stored
    ...restOptions,
  };

  try {
    const response = await fetch(
      `${API_BASE_URL.replace(/\/+$/g, "")}/${endpoint.replace(/^\/+/, "")}`,
      fetchOptions
    );

    if (!response.ok) {
      let errorMessage = `API (FormData) request to ${endpoint} failed with status ${response.status}`;
      let errorDetails = null;
      try {
        const errorBodyText = await response.text();
        if (errorBodyText) {
          errorDetails = JSON.parse(errorBodyText);
          errorMessage += `: ${
            errorDetails.title ||
            errorDetails.message ||
            JSON.stringify(errorDetails)
          }`;
        } else {
          errorMessage += `: ${response.statusText}`;
        }
      } catch {
        errorMessage += `: ${response.statusText}`;
      }
      console.error(errorMessage, {
        endpoint,
        formDataContent: Array.from(formData.entries()),
        errorDetails,
      });
      const apiError = new Error(errorMessage);
      apiError.details = errorDetails;
      apiError.status = response.status;
      throw apiError;
    }

    const contentType = response.headers.get("content-type") || "";
    if (response.status === 204) {
      return null;
    }

    if (contentType.includes("application/json")) {
      return await response.json();
    }
    if (contentType.includes("text/plain")) {
      return await response.text();
    }

    const textContent = await response.text();
    if (textContent) {
      try {
        return JSON.parse(textContent);
      } catch {
        console.warn(
          `Received OK response from ${endpoint} (FormData) with Content-Type '${contentType}' but couldn't parse as JSON. Returning as text.`
        );
        return textContent;
      }
    }

    return null;
  } catch (err) {
    if (!err.message.startsWith("API (FormData) request to")) {
      console.error(
        `Network or other error calling ${endpoint} with FormData:`,
        err
      );
    }
    throw err;
  }
}
