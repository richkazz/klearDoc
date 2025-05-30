// src/utils/verificationResultUtils.js

// Mirrored from C# enum RequiredActionType
export const RequiredActionType = {
  None: "None",
  RequestImprovedImage: "RequestImprovedImage",
  RequestMissingInformation: "RequestMissingInformation",
  ReviewManually: "ReviewManually",
  Error: "Error", // System error during processing by API
  FaceMismatch: "FaceMismatch",
  InvalidDocumentType: "InvalidDocumentType",
};

export const RequiredActionTypeUserMessages = {
  [RequiredActionType.None]: "",
  [RequiredActionType.RequestImprovedImage]:
    "The document image provided is unclear or incomplete. Please upload a better quality image.",
  [RequiredActionType.RequestMissingInformation]:
    "Some information could not be extracted from the document. Please ensure the document is complete and clear, or check if all required fields are visible.",
  [RequiredActionType.ReviewManually]:
    "The system requires manual review for this document. Our team will look into it. You might be contacted for more information.",
  [RequiredActionType.Error]:
    "A system error occurred while processing your document. Please try again later or contact support. If the issue persists, note any error details provided.",
  [RequiredActionType.FaceMismatch]:
    "The face in the provided picture does not appear to match the face on the document. Please ensure you are uploading a clear, recent photo of yourself and that the document photo is also clear.",
  [RequiredActionType.InvalidDocumentType]:
    "The uploaded document does not seem to be of the selected type or is not a supported document. Please verify your selection and document.",
};
