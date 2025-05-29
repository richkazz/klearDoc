// src/features/verification/VerificationResultDisplay.jsx
import React from "react";
import Button from "../../components/Button";
import { CheckCircle, XCircle, Copy } from "lucide-react";

const VerificationResultDisplay = ({ resultData, error, onReset }) => {
  const handleCopyToken = (token) => {
    navigator.clipboard
      .writeText(token)
      .then(() => alert("Token copied to clipboard!"))
      .catch((err) => console.error("Failed to copy token: ", err));
  };

  if (error) {
    return (
      <div className="result-display">
        <div className="error-box">
          <XCircle
            size={48}
            color="var(--error-color)"
            style={{ marginBottom: "15px" }}
          />
          <h3>Verification Failed</h3>
          <p>{error.message || "An unknown error occurred."}</p>
          {error.details && (
            <pre
              style={{
                fontSize: "0.8em",
                textAlign: "left",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {JSON.stringify(error.details, null, 2)}
            </pre>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button onClick={onReset} variant="primary">
            Try Another Verification
          </Button>
        </div>
      </div>
    );
  }

  if (!resultData) {
    // Should ideally not happen if not erroring and no data
    return (
      <div className="result-display">
        <p>No verification data available.</p>
      </div>
    );
  }

  // Assuming resultData has a structure like the example
  // You'll need to adapt this to your actual API response structure
  const { extractedInfo, success, token, message } = resultData;
  // Example: success = resultData.status === 'success' (or similar)
  // Example: token = resultData.verificationToken
  // Example: extractedInfo = resultData.data (or resultData.extracted_information)

  if (!success && message) {
    // API indicates failure but not a network error
    return (
      <div className="result-display">
        <div className="error-box">
          <XCircle
            size={48}
            color="var(--error-color)"
            style={{ marginBottom: "15px" }}
          />
          <h3>Verification Problem</h3>
          <p>{message}</p>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button onClick={onReset} variant="primary">
            Try Another Verification
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="result-display">
      <h2>3. Verification Result</h2>
      {success ? (
        <div className="success-box">
          <CheckCircle
            size={48}
            color="var(--success-color)"
            style={{ marginBottom: "15px" }}
          />
          <h3>Verification Successful!</h3>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div className="error-box">
          {" "}
          {/* For API handled "failure" that is not a JS error */}
          <XCircle
            size={48}
            color="var(--error-color)"
            style={{ marginBottom: "15px" }}
          />
          <h3>Verification Unsuccessful</h3>
          {message && <p>{message || "The document could not be verified."}</p>}
        </div>
      )}

      {extractedInfo && Object.keys(extractedInfo).length > 0 && (
        <>
          <h3 style={{ marginTop: "30px", color: "var(--primary-color)" }}>
            Extracted Information
          </h3>
          <div className="info-grid">
            {Object.entries(extractedInfo).map(([key, value]) => (
              <div key={key} className="info-item">
                <strong>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  :{" "}
                </strong>
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)}
                {key.toLowerCase() === "confidence" && (
                  <span
                    className="confidence-badge"
                    style={{ marginLeft: "10px" }}
                  >
                    {value}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

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
            <input type="text" value={token} readOnly />
            <Button
              onClick={() => handleCopyToken(token)}
              variant="secondary"
              style={{ height: "40px" }}
            >
              <Copy size={16} /> Copy
            </Button>
          </div>
          <small>
            Financial institutions can use this token to verify your identity.
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
