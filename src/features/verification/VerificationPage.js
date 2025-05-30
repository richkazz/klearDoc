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

import {
  RequiredActionType,
  RequiredActionTypeUserMessages,
} from "../../utils/verificationResultUtils"; // New Import

const STEPS = {
  SELECT_TYPE: 1,
  UPLOAD_FORM: 2,
  SHOW_RESULT: 3,
};

const VerificationPage = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_TYPE);
  const [selectedDocType, setSelectedDocType] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null); // This will hold the new structured data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // For client-side/network errors

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleSelectDocumentType = (docType) => {
    setSelectedDocType(docType);
    setCurrentStep(STEPS.UPLOAD_FORM);
    setError(null);
    setVerificationResult(null);
  };

  const handleUploadSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setVerificationResult(null);

    try {
      const apiPayload = {
        documentFile: formData.documentFile,
        userImageFile: formData.userImageFile,
        documentTypeString: getDocumentTypeString(selectedDocType.value),
        kdid: formData.kdid,
      };
      const apiResponse = await verifyDocument(apiPayload); // apiResponse is DocumentVerificationResult

      if (!apiResponse || typeof apiResponse !== "object") {
        console.error("Unexpected API response:", apiResponse);
        setError({ message: "Received an invalid response from the server." });
        setCurrentStep(STEPS.SHOW_RESULT);
        return;
      }

      // Construct the frontend verificationResult state
      const actionReq =
        apiResponse.documentWorkflowDecision?.actionRequired ||
        RequiredActionType.None;
      const extractedData = apiResponse.extractedData || null;
      // Attempt to find a token (speculative based on common naming)
      const token =
        extractedData?.verificationToken ||
        extractedData?.token ||
        extractedData?.KlearDocToken ||
        apiResponse.token ||
        null;

      const resultForFrontend = {
        isVerified: apiResponse.isVerified || false,
        apiUserMessage: apiResponse.documentWorkflowDecision?.userMessage || "",
        actionRequired: actionReq,
        actionRequiredUserMessage:
          RequiredActionTypeUserMessages[actionReq] || "",
        extractedData: extractedData,
        facialImageComparison: apiResponse.facialImageComparison
          ? {
              isMatch: apiResponse.facialImageComparison.isMatch,
              // API ConfidenceScore is 0.0-1.0, convert to percentage for display
              confidenceScore:
                apiResponse.facialImageComparison.confidenceScore !==
                  undefined &&
                apiResponse.facialImageComparison.confidenceScore !== null
                  ? (
                      apiResponse.facialImageComparison.confidenceScore * 100
                    ).toFixed(1)
                  : null,
              remarks: apiResponse.facialImageComparison.remarks || null,
            }
          : null,
        apiSystemErrorMessage: apiResponse.errorMessage || null,
        token: token, // Store the found token
      };

      setVerificationResult(resultForFrontend);
      setCurrentStep(STEPS.SHOW_RESULT);
    } catch (err) {
      console.error("Verification API error:", err);
      // This 'err' is a client-side error (network, fetchWithFormData error, etc.)
      setError({
        message:
          err.message || "Failed to connect to the verification service.",
        details: err.details, // if appClient provides it
        status: err.status, // if appClient provides it
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
      setSelectedDocType(null);
    } else if (currentStep === STEPS.SHOW_RESULT) {
      setCurrentStep(STEPS.UPLOAD_FORM);
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
    // ... (isLoading logic remains the same) ...
    if (isLoading && currentStep !== STEPS.SHOW_RESULT) {
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
            {/* Pass the structured verificationResult and any client/network error */}
            {!isLoading && (
              <VerificationResultDisplay
                resultData={verificationResult}
                clientError={error}
                onReset={handleReset}
              />
            )}
          </>
        );
      default:
        return <p>Unknown step.</p>;
    }
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

      {/* Display client/network errors that occur before result page */}
      {error && currentStep !== STEPS.SHOW_RESULT && (
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
