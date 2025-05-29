// src/features/verification/UploadForm.jsx
import React, { useState, useRef } from "react";
import { UploadCloud, Camera, FileText, User } from "lucide-react";
import Button from "../../components/Button"; // Assuming you have this
import { requiresImage as checkRequiresImage } from "../../utils/documentTypeUtils";

const CustomFileInput = ({
  id,
  label,
  onChange,
  accept,
  capture,
  fileName,
  icon,
}) => {
  const inputRef = useRef(null);
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div
        className="file-input-custom"
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        <input
          type="file"
          id={id}
          ref={inputRef}
          onChange={onChange}
          accept={accept}
          capture={capture} // For camera
          style={{ display: "none" }}
        />
        {icon}
        <span>{fileName || "Click to choose file"}</span>
      </div>
      {fileName && <p className="file-name">Selected: {fileName}</p>}
    </div>
  );
};

const UploadForm = ({ selectedDocType, onSubmit, onBack, isLoading }) => {
  const [documentFile, setDocumentFile] = useState(null);
  const [userImageFile, setUserImageFile] = useState(null);
  const [kdid, setKdid] = useState(""); // Default KDID or make it required

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!documentFile) {
      alert("Please select the document file."); // Simple validation
      return;
    }
    if (checkRequiresImage(selectedDocType.value) && !userImageFile) {
      alert("Please provide a face picture for this document type.");
      return;
    }
    if (!kdid.trim()) {
      alert("Please enter the KDID.");
      return;
    }
    onSubmit({
      documentFile,
      userImageFile: checkRequiresImage(selectedDocType.value)
        ? userImageFile
        : null,
      kdid,
    });
  };

  return (
    <div className="upload-form">
      <h2>2. Upload: {selectedDocType.displayName}</h2>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Upload your document and a face picture if required. Ensure images are
        clear.
      </p>
      <form onSubmit={handleSubmit}>
        <CustomFileInput
          id="documentFile"
          label="Document File"
          icon={<FileText size={20} style={{ marginRight: "8px" }} />}
          onChange={(e) => setDocumentFile(e.target.files[0])}
          accept="image/*,.pdf" // Adjust accepted types
          fileName={documentFile?.name}
        />

        {checkRequiresImage(selectedDocType.value) && (
          <CustomFileInput
            id="userImageFile"
            label="Your Face Picture (Live Capture Preferred)"
            icon={<Camera size={20} style={{ marginRight: "8px" }} />}
            onChange={(e) => setUserImageFile(e.target.files[0])}
            accept="image/*"
            capture="user" // Prioritize front camera
            fileName={userImageFile?.name}
          />
        )}

        <div className="form-group">
          <label htmlFor="kdid">KDID (KlearDoc ID)</label>
          <input
            type="text"
            id="kdid"
            value={kdid}
            onChange={(e) => setKdid(e.target.value)}
            placeholder="Enter your KDID (e.g., 0987654321)"
            required
          />
        </div>

        <div className="form-actions">
          <Button
            type="button"
            onClick={onBack}
            variant="secondary"
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={
              isLoading ||
              !documentFile ||
              (checkRequiresImage(selectedDocType.value) && !userImageFile) ||
              !kdid
            }
          >
            {isLoading ? "Verifying..." : "Submit for Verification"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
