// src/utils/documentTypeUtils.js

export const DocumentVerificationType = {
  Unknown: 0,
  DriverLicense: 1,
  Passport: 2,
  NinSlip: 3,
  VotersCard: 4,
  UtilityBill: 5,
  BvnDetailPrintout: 6,
  StudentIdCard: 7,
  CertificateOfOrigin: 8,
  TaxClearanceCertificate: 9,
  BusinessRegistrationDoc: 10,
  NinCard: 11,
};

export const DocumentVerificationTypeNames = {
  [DocumentVerificationType.DriverLicense]: "Driver's License",
  [DocumentVerificationType.Passport]: "Passport",
  [DocumentVerificationType.NinSlip]: "NIN Slip",
  [DocumentVerificationType.VotersCard]: "Voter's Card",
  [DocumentVerificationType.UtilityBill]: "Utility Bill",
  [DocumentVerificationType.BvnDetailPrintout]: "BVN Detail Printout",
  [DocumentVerificationType.StudentIdCard]: "Student ID Card",
  [DocumentVerificationType.CertificateOfOrigin]: "Certificate of Origin",
  [DocumentVerificationType.TaxClearanceCertificate]:
    "Tax Clearance Certificate",
  [DocumentVerificationType.BusinessRegistrationDoc]:
    "Business Registration Document",
  [DocumentVerificationType.NinCard]: "NIN Card",
};

// Convert enum keys to an array of objects for easier mapping in React
export const AllDocumentTypes = Object.keys(DocumentVerificationType)
  .filter(
    (key) => DocumentVerificationType[key] !== DocumentVerificationType.Unknown
  ) // Exclude Unknown
  .map((key) => ({
    key: key, // e.g., "DriverLicense"
    value: DocumentVerificationType[key], // e.g., 1
    displayName:
      DocumentVerificationTypeNames[DocumentVerificationType[key]] || key,
  }));

export function requiresImage(documentTypeKeyOrValue) {
  // Resolve to the numeric value if a key string is passed
  const typeValue =
    typeof documentTypeKeyOrValue === "string"
      ? DocumentVerificationType[documentTypeKeyOrValue]
      : documentTypeKeyOrValue;

  switch (typeValue) {
    case DocumentVerificationType.DriverLicense:
    case DocumentVerificationType.Passport:
    case DocumentVerificationType.NinSlip:
    case DocumentVerificationType.VotersCard:
    case DocumentVerificationType.StudentIdCard:
      // case DocumentVerificationType.CertificateOfOrigin: // Assuming these might not always need a live photo
      // case DocumentVerificationType.TaxClearanceCertificate:
      // case DocumentVerificationType.BusinessRegistrationDoc:
      return true;
    default:
      return false;
  }
}

// Helper to get the string key from a value, needed for API
export function getDocumentTypeString(value) {
  for (const key in DocumentVerificationType) {
    if (DocumentVerificationType[key] === value) {
      return key;
    }
  }
  return "Unknown";
}
