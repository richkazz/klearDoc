// src/services/verificationService.js
import { fetchWithFormData } from "./apiClient"; // Adjust path as needed

const API_ENDPOINT = "/api/DocumentVerification/verify-document";

/**
 * Verifies a document with KlearDoc.
 * @param {object} data
 * @param {File} data.documentFile - The main document file.
 * @param {File} [data.userImageFile] - Optional user's face picture.
 * @param {string} data.documentTypeString - The string representation of the document type (e.g., "NinSlip").
 * @param {string} data.kdid - The KDID.
 * @returns {Promise<any>} The API response.
 */
export const verifyDocument = async ({
  documentFile,
  userImageFile,
  documentTypeString,
  kdid,
}) => {
  const formData = new FormData();
  formData.append("imageFile", documentFile, documentFile.name);
  if (userImageFile) {
    formData.append("UserImage", userImageFile, userImageFile.name);
  }
  formData.append("documentType", documentTypeString);
  formData.append("KDID", kdid);

  // For debugging FormData content:
  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }

  return fetchWithFormData(API_ENDPOINT, formData);
};

// ... (existing verifyDocument function) ...

const VERIFY_KDID_ENDPOINT = "/api/DocumentVerification/verify-kdid-with-face";

/**
 * Verifies a KDID by matching it with a provided live face picture.
 * @param {object} data
 * @param {File} data.userImageFile - The user's live face picture.
 * @param {string} data.kdid - The KDID to verify.
 * @returns {Promise<any>} The API response. (Assuming it might return a boolean or a simple status object)
 */
export const verifyKdidWithFace = async ({ userImageFile, kdid }) => {
  const formData = new FormData();
  // The backend expects the file as the first item in request.Files
  // and the name doesn't strictly matter for request.Files[0] but good practice to set it.
  formData.append("faceImage", userImageFile, userImageFile.name); // "faceImage" is an arbitrary key for FormData
  formData.append("KDID", kdid);

  // For debugging FormData content:
  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }

  // Assuming the response might be simpler, e.g., boolean or { success: true, message: "..." }
  // The fetchWithFormData might need adjustment if the response is not JSON (e.g., plain text "true")
  return fetchWithFormData(VERIFY_KDID_ENDPOINT, formData);
};
