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
