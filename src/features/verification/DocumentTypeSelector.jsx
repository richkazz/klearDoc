// src/features/verification/DocumentTypeSelector.jsx
import React from "react";
import {
  AllDocumentTypes,
  requiresImage as checkRequiresImage,
} from "../../utils/documentTypeUtils";
import {
  FileText,
  Camera,
  ShieldCheck,
  Landmark,
  UserSquare2,
} from "lucide-react"; // Example icons

// Helper to get an icon based on type (can be expanded)
const getIconForType = (typeKey) => {
  if (
    typeKey.includes("Nin") ||
    typeKey.includes("License") ||
    typeKey.includes("Passport") ||
    typeKey.includes("Voters") ||
    typeKey.includes("StudentId")
  ) {
    return <UserSquare2 className="lucide" />;
  }
  if (typeKey.includes("Business")) return <Landmark className="lucide" />;
  return <FileText className="lucide" />;
};

const DocumentTypeSelector = ({ onSelectDocumentType }) => {
  return (
    <div className="doc-type-selector">
      <h2>1. Select Document Type</h2>
      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Choose the type of document you want to verify with KlearDoc.
      </p>
      <div className="doc-type-grid">
        {AllDocumentTypes.map((docType) => (
          <div
            key={docType.value}
            className="doc-type-card"
            onClick={() => onSelectDocumentType(docType)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) =>
              e.key === "Enter" && onSelectDocumentType(docType)
            }
          >
            {getIconForType(docType.key)}
            <h3>{docType.displayName}</h3>
            {checkRequiresImage(docType.value) && (
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <Camera size={16} /> Requires face picture
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTypeSelector;
