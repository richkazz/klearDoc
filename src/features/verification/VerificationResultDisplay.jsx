// src/features/verification/VerificationResultDisplay.jsx
import React from "react";
import Button from "../../components/Button";
import {
  CheckCircle,
  XCircle,
  Copy,
  AlertTriangle,
  Info,
  UserCheck,
  UserX,
} from "lucide-react";
import { RequiredActionType } from "../../utils/verificationResultUtils"; // For comparison

const DetailItem = ({ label, value, className = "" }) => (
  <div className={`info-item ${className}`}>
    <strong>{label}: </strong>
    {value}
  </div>
);

const VerificationResultDisplay = ({ resultData, clientError, onReset }) => {
  const handleCopyToken = (token) => {
    navigator.clipboard
      .writeText(token)
      .then(() => alert("Token copied to clipboard!"))
      .catch((err) => console.error("Failed to copy token: ", err));
  };

  // Handle client-side/network errors first
  if (clientError) {
    return (
      <div className="result-display">
        <div className="error-box">
          <AlertTriangle // More generic error icon
            size={48}
            color="var(--error-color)"
            style={{ marginBottom: "15px" }}
          />
          <h3>Verification Request Failed</h3>
          <p>
            {clientError.message ||
              "An unknown error occurred while contacting the server."}
          </p>
          {clientError.details && (
            <pre
              style={{
                fontSize: "0.8em",
                textAlign: "left",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
                backgroundColor: "#f1f1f1",
                padding: "10px",
                borderRadius: "4px",
                marginTop: "10px",
              }}
            >
              {JSON.stringify(clientError.details, null, 2)}
            </pre>
          )}
          {clientError.status && <p>Status Code: {clientError.status}</p>}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button onClick={onReset} variant="primary">
            Try Another Verification
          </Button>
        </div>
      </div>
    );
  }

  // Handle cases where resultData might be null (e.g., if API call was cancelled before completion but no clientError thrown)
  if (!resultData) {
    return (
      <div className="result-display">
        <div className="info-box" style={{ textAlign: "center" }}>
          <Info
            size={48}
            color="var(--primary-color)"
            style={{ marginBottom: "15px" }}
          />
          <p>Verification process did not complete or no data was returned.</p>
          <p>
            If you submitted a document, please try again or check your
            connection.
          </p>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button onClick={onReset} variant="primary">
            Start New Verification
          </Button>
        </div>
      </div>
    );
  }

  // Destructure the processed data from VerificationPage
  const {
    isVerified,
    apiUserMessage,
    actionRequired,
    actionRequiredUserMessage,
    extractedData,
    facialImageComparison,
    apiSystemErrorMessage,
    token, // The token we tried to find
  } = resultData;

  const overallSuccess =
    isVerified && actionRequired === RequiredActionType.None;

  return (
    <div className="result-display">
      <h2>3. Verification Result</h2>

      {/* Main Status: Verified or Not */}
      {isVerified ? (
        <div className="success-box">
          <CheckCircle
            size={48}
            color="var(--success-color)"
            style={{ marginBottom: "15px" }}
          />
          <h3>Document Verified</h3>
          {apiUserMessage && <p>{apiUserMessage}</p>}
        </div>
      ) : (
        <div className="error-box">
          <XCircle
            size={48}
            color="var(--error-color)"
            style={{ marginBottom: "15px" }}
          />
          <h3>Document Not Verified</h3>
          {apiUserMessage && <p>{apiUserMessage}</p>}
        </div>
      )}

      {/* Action Required Message */}
      {actionRequired !== RequiredActionType.None &&
        actionRequiredUserMessage && (
          <div
            className={`info-box ${
              !isVerified || actionRequired === RequiredActionType.Error
                ? "action-required-error"
                : "action-required-info"
            }`}
            style={{
              marginTop: "20px",
              borderLeftWidth: "5px",
              borderLeftColor:
                !isVerified || actionRequired === RequiredActionType.Error
                  ? "var(--error-color)"
                  : "var(--primary-color)",
            }}
          >
            <h4>
              Action Required:{" "}
              {actionRequired.replace(/([A-Z])/g, " $1").trim()}
            </h4>
            <p>{actionRequiredUserMessage}</p>
          </div>
        )}

      {/* API System Error Message (if any) */}
      {apiSystemErrorMessage && (
        <div
          className="error-box"
          style={{
            marginTop: "20px",
            backgroundColor: "#fff3cd",
            color: "#856404",
            borderColor: "#ffeeba",
          }}
        >
          <h4>System Message</h4>
          <p>{apiSystemErrorMessage}</p>
        </div>
      )}

      {/* Facial Image Comparison Details */}
      {facialImageComparison && (
        <>
          <h3 style={{ marginTop: "30px", color: "var(--primary-color)" }}>
            Facial Image Comparison
          </h3>
          <div className="info-grid">
            <DetailItem
              label="Face Match"
              value={
                facialImageComparison.isMatch ? (
                  <span
                    style={{
                      color: "var(--success-color)",
                      fontWeight: "bold",
                    }}
                  >
                    <UserCheck
                      size={18}
                      style={{ verticalAlign: "bottom", marginRight: "5px" }}
                    />{" "}
                    Yes
                  </span>
                ) : (
                  <span
                    style={{ color: "var(--error-color)", fontWeight: "bold" }}
                  >
                    <UserX
                      size={18}
                      style={{ verticalAlign: "bottom", marginRight: "5px" }}
                    />{" "}
                    No
                  </span>
                )
              }
            />
            {facialImageComparison.confidenceScore !== null && (
              <DetailItem
                label="Match Confidence"
                value={`${facialImageComparison.confidenceScore}%`}
              />
            )}
            {facialImageComparison.remarks && (
              <DetailItem
                label="AI Remarks"
                value={facialImageComparison.remarks}
                className="full-width-item"
              />
            )}
          </div>
        </>
      )}

      {/* Extracted Information */}
      {extractedData && Object.keys(extractedData).length > 0 && (
        <>
          <h3 style={{ marginTop: "30px", color: "var(--primary-color)" }}>
            Extracted Information
          </h3>
          <div className="info-grid">
            {Object.entries(extractedData)
              // Filter out the token if it was found and stored separately (to avoid duplicate display)
              .filter(
                ([key]) =>
                  !(
                    token &&
                    (key === "verificationToken" ||
                      key === "token" ||
                      key === "KlearDocToken")
                  )
              )
              .map(([key, value]) => {
                // Simple formatting for keys like "firstName" -> "First Name"
                const displayKey = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());
                return (
                  <DetailItem
                    key={key}
                    label={displayKey}
                    value={
                      typeof value === "object"
                        ? JSON.stringify(value, null, 2)
                        : String(value)
                    }
                    className={
                      typeof value === "object"
                        ? "full-width-item code-block"
                        : ""
                    } // Add class for object display
                  />
                );
              })}
          </div>
        </>
      )}

      {/* Token Display (if found) */}
      {token && (
        <div
          className="token-display success-box"
          style={{ marginTop: "20px" }}
        >
          <h4>Your KlearDoc Verification Token:</h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              value={token}
              readOnly
              style={{ flexGrow: 1, marginRight: "10px" }}
            />
            <Button
              onClick={() => handleCopyToken(token)}
              variant="secondary"
              style={{ height: "40px", padding: "0 15px" }} // Adjusted padding
            >
              <Copy size={16} style={{ marginRight: "5px" }} /> Copy
            </Button>
          </div>
          <small>
            This token can be used by authorized parties to reference this
            verification event.
          </small>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Button onClick={onReset} variant="primary">
          Start New Verification
        </Button>
      </div>
    </div>
  );
};

export default VerificationResultDisplay;
