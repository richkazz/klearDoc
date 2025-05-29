// src/features/verification/VerificationPage.jsx
import React, { useState, useEffect } from "react";
import DocumentTypeSelector from "./DocumentTypeSelector";
import UploadForm from "./UploadForm";
import VerificationResultDisplay from "./VerificationResultDisplay";
import LoadingSpinner from "../../components/LoadingSpinner";
import Button from "../../components/Button";
import { verifyDocument } from "../../services/verificationService";
import { getDocumentTypeString } from "../../utils/documentTypeUtils"; // For API
import "./VerificationPage.css"; // Main styles
import { ShieldAlert } from "lucide-react"; // For error icon

const STEPS = {
  SELECT_TYPE: 1,
  UPLOAD_FORM: 2,
  SHOW_RESULT: 3,
};

const VerificationPage = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_TYPE);
  const [selectedDocType, setSelectedDocType] = useState(null); // Stores the full docType object
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleSelectDocumentType = (docType) => {
    setSelectedDocType(docType);
    setCurrentStep(STEPS.UPLOAD_FORM);
    setError(null); // Clear previous errors
    setVerificationResult(null); // Clear previous results
  };

  const handleUploadSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setVerificationResult(null);

    try {
      const apiPayload = {
        documentFile: formData.documentFile,
        userImageFile: formData.userImageFile,
        documentTypeString: getDocumentTypeString(selectedDocType.value), // API needs string like "NinSlip"
        kdid: formData.kdid,
      };
      const result = await verifyDocument(apiPayload);

      // Adapt this based on your ACTUAL API response structure
      // This is a common pattern:
      if (
        result &&
        (result.success === true ||
          result.status === "success" ||
          (result.extractedInfo &&
            Object.keys(result.extractedInfo).length > 0))
      ) {
        setVerificationResult({
          // Assuming result has 'extractedInfo', 'token', 'success', 'message'
          extractedInfo: result.extractedInfo || result.data || {},
          token: result.token || result.verificationToken || null,
          success: true, // Or derive from API response
          message: result.message || "Verification processed.",
        });
      } else if (
        result &&
        (result.success === false || result.status === "failed")
      ) {
        setVerificationResult({
          extractedInfo: result.extractedInfo || {},
          token: null,
          success: false,
          message:
            result.message ||
            "Verification could not be completed successfully.",
        });
      } else {
        // If the API returns text or an unexpected JSON structure for success
        // For example, if it returns just the token string on success:
        if (typeof result === "string" && result.startsWith("klr-")) {
          setVerificationResult({
            extractedInfo: {}, // No extracted info in this hypothetical case
            token: result,
            success: true,
            message: "Verification successful!",
          });
        } else if (typeof result === "object" && result !== null) {
          // Some other object
          setVerificationResult({
            extractedInfo: result.data || result, // Try to find data
            token: result.token || null,
            success: Object.keys(result).length > 0, // Tentative success
            message:
              result.message || "Verification processed with partial data.",
          });
        } else {
          console.warn("Unexpected API response structure:", result);
          setError({
            message: "Received an unexpected response from the server.",
          });
        }
      }
      setCurrentStep(STEPS.SHOW_RESULT);
    } catch (err) {
      console.error("Verification API error:", err);
      setError({
        message: err.message || "Failed to verify document.",
        details: err.details, // if appClient provides it
      });
      setCurrentStep(STEPS.SHOW_RESULT); // Still go to result step to show the error
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setError(null);
    if (currentStep === STEPS.UPLOAD_FORM) {
      setCurrentStep(STEPS.SELECT_TYPE);
      setSelectedDocType(null); // Clear selection
    } else if (currentStep === STEPS.SHOW_RESULT) {
      setCurrentStep(STEPS.UPLOAD_FORM); // Go back to form, keeps data
    }
  };

  const handleReset = () => {
    setCurrentStep(STEPS.SELECT_TYPE);
    setSelectedDocType(null);
    setVerificationResult(null);
    setError(null);
    setIsLoading(false);
  };

  const renderStepContent = () => {
    if (isLoading && currentStep !== STEPS.SHOW_RESULT) {
      // Show full page loader if not on result page
      return <LoadingSpinner />;
    }

    switch (currentStep) {
      case STEPS.SELECT_TYPE:
        return (
          <DocumentTypeSelector
            onSelectDocumentType={handleSelectDocumentType}
          />
        );
      case STEPS.UPLOAD_FORM:
        return (
          <UploadForm
            selectedDocType={selectedDocType}
            onSubmit={handleUploadSubmit}
            onBack={handleBack}
            isLoading={isLoading}
          />
        );
      case STEPS.SHOW_RESULT:
        return (
          <>
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
              <VerificationResultDisplay
                resultData={verificationResult}
                error={error}
                onReset={handleReset}
              />
            )}
          </>
        );
      default:
        return <p>Unknown step.</p>;
    }
  };

  const getStepName = (step) => {
    if (step === STEPS.SELECT_TYPE) return "Select Document";
    if (step === STEPS.UPLOAD_FORM) return "Upload Details";
    if (step === STEPS.SHOW_RESULT) return "View Result";
    return "";
  };

  return (
    <div className="verification-page-container">
      <header className="page-header">
        <img src="/images/kleardoc-logo7.png" alt="KlearDoc Logo" />
        <div className="header-content">
          <h1>KlearDoc Verification</h1>
        </div>
        {currentStep !== STEPS.SELECT_TYPE && (
          <Button onClick={handleReset} variant="secondary">
            Start Over
          </Button>
        )}
      </header>

      <div className="step-indicator">
        <div className={currentStep === STEPS.SELECT_TYPE ? "active-step" : ""}>
          1. Select Type
        </div>
        <div className={currentStep === STEPS.UPLOAD_FORM ? "active-step" : ""}>
          2. Upload
        </div>
        <div className={currentStep === STEPS.SHOW_RESULT ? "active-step" : ""}>
          3. Result
        </div>
      </div>

      {error &&
        currentStep !== STEPS.SHOW_RESULT && ( // Global error display if not handled by result page
          <div className="general-error-message">
            <ShieldAlert
              size={24}
              style={{ marginRight: "10px", verticalAlign: "middle" }}
            />
            <p>
              <strong>Error:</strong> {error.message}
            </p>
            {error.details && (
              <pre style={{ fontSize: "0.8em", textAlign: "left" }}>
                {JSON.stringify(error.details, null, 2)}
              </pre>
            )}
          </div>
        )}

      {renderStepContent()}
    </div>
  );
};

export default VerificationPage;
