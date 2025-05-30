// src/features/identityChallenge/IdentityChallengePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Camera,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  UserCheck,
} from "lucide-react";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import { verifyKdidWithFace } from "../../services/verificationService";
import "./IdentityChallengePage.css"; // We'll create this CSS file

const IdentityChallengePage = () => {
  const { kdid } = useParams(); // Get KDID from URL path e.g. /challenge/12345
  const location = useLocation(); // To get query parameters

  const [serviceName, setServiceName] = useState("");
  const [userImageFile, setUserImageFile] = useState(null);
  const [userImagePreview, setUserImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null); // 'success', 'failure', or null
  const [errorMessage, setErrorMessage] = useState("");
  const [apiResponseMessage, setApiResponseMessage] = useState(""); // For messages from API on success/fail

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const service = queryParams.get("service");
    if (service) {
      setServiceName(decodeURIComponent(service));
    }
  }, [location.search]);

  const startCamera = async () => {
    setVerificationStatus(null); // Reset status
    setErrorMessage("");
    setUserImageFile(null);
    setUserImagePreview(null);
    setShowCamera(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setErrorMessage(
        "Could not access camera. Please ensure permissions are granted and try again."
      );
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setShowCamera(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `face-capture-${Date.now()}.png`, {
            type: "image/png",
          });
          setUserImageFile(file);
          setUserImagePreview(URL.createObjectURL(file));
          stopCamera(); // Close camera after capture
        }
      }, "image/png");
    }
  };

  const handleRetake = () => {
    setUserImageFile(null);
    setUserImagePreview(null);
    setVerificationStatus(null);
    startCamera(); // Restart camera for retake
  };

  const handleSubmitVerification = async () => {
    if (!userImageFile || !kdid) {
      setErrorMessage("A face picture and KDID are required.");
      return;
    }
    setIsLoading(true);
    setVerificationStatus(null);
    setErrorMessage("");
    setApiResponseMessage("");

    try {
      // The API returns the result of documentVerificationAgentService.VerifyKdidWithFace
      // This might be a boolean, or a simple object. Let's assume an object like:
      // { isMatch: true, message: "Verification successful" } or
      // { isMatch: false, message: "Face does not match", errorCode: "FACE_MISMATCH" }
      const response = await verifyKdidWithFace({ userImageFile, kdid });

      if (response && typeof response === "object") {
        // Adapt based on actual response structure from documentVerificationAgentService.VerifyKdidWithFace
        if (
          response.isMatch === true ||
          response.success === true ||
          response.isVerified === true
        ) {
          setVerificationStatus("success");
          setApiResponseMessage(
            response.message ||
              response.userMessage ||
              "Identity confirmed successfully."
          );
        } else {
          setVerificationStatus("failure");
          setApiResponseMessage(
            response.message ||
              response.userMessage ||
              "Identity confirmation failed. Please ensure your face is clear and well-lit."
          );
        }
      } else if (response === true) {
        // If it just returns a boolean
        setVerificationStatus("success");
        setApiResponseMessage("Identity confirmed successfully.");
      } else if (response === false) {
        setVerificationStatus("failure");
        setApiResponseMessage("Identity confirmation failed.");
      } else {
        // Handle unexpected response
        setVerificationStatus("failure");
        setErrorMessage("Received an unexpected response from the server.");
        console.warn("Unexpected API response for KDID face verify:", response);
      }
    } catch (error) {
      console.error("Error verifying KDID with face:", error);
      setVerificationStatus("failure");
      setErrorMessage(
        error.message ||
          "An error occurred during verification. Please try again."
      );
      if (error.details) {
        setApiResponseMessage(`Details: ${JSON.stringify(error.details)}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup camera stream on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="identity-challenge-page-container">
      <header className="ic-page-header">
        <img
          src="/images/kleardoc-logo7.png"
          alt="KlearDoc Logo"
          className="ic-logo"
        />
        <h1>Identity Confirmation</h1>
      </header>

      <div className="ic-content-card">
        {serviceName && (
          <p className="ic-service-info">
            <strong>{serviceName}</strong> is requesting to confirm your
            identity using KlearDoc.
          </p>
        )}
        <p className="ic-instructions">
          Please take a clear, live picture of your face to proceed. Ensure good
          lighting and that your face is fully visible.
        </p>
        <p className="ic-kdid-display">
          Confirming Identity for KDID: <strong>{kdid}</strong>
        </p>

        {isLoading && <LoadingSpinner />}

        {!isLoading && verificationStatus && (
          <div
            className={`ic-status-message ${
              verificationStatus === "success" ? "ic-success" : "ic-failure"
            }`}
          >
            {verificationStatus === "success" ? (
              <CheckCircle size={32} />
            ) : (
              <XCircle size={32} />
            )}
            <p>
              <strong>
                {verificationStatus === "success"
                  ? "Identity Confirmed!"
                  : "Identity Confirmation Failed"}
              </strong>
              {apiResponseMessage && (
                <span className="ic-api-message">{apiResponseMessage}</span>
              )}
            </p>
            {verificationStatus === "failure" && (
              <Button
                onClick={handleRetake}
                variant="secondary"
                className="ic-button"
              >
                <RotateCcw size={16} /> Try Again
              </Button>
            )}
          </div>
        )}

        {errorMessage && !isLoading && (
          <div className="ic-error-message">
            <AlertTriangle size={20} />
            <p>{errorMessage}</p>
          </div>
        )}

        {!isLoading && !verificationStatus && (
          <>
            {showCamera && !userImagePreview && (
              <div className="ic-camera-view">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="ic-video-feed"
                ></video>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
                <Button
                  onClick={captureImage}
                  variant="primary"
                  className="ic-button ic-capture-button"
                >
                  <Camera size={16} /> Capture Picture
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="secondary"
                  className="ic-button"
                >
                  Cancel
                </Button>
              </div>
            )}

            {userImagePreview && (
              <div className="ic-image-preview-container">
                <img
                  src={userImagePreview}
                  alt="Captured face"
                  className="ic-image-preview"
                />
                <div className="ic-preview-actions">
                  <Button
                    onClick={handleRetake}
                    variant="secondary"
                    className="ic-button"
                  >
                    <RotateCcw size={16} /> Retake
                  </Button>
                  <Button
                    onClick={handleSubmitVerification}
                    variant="primary"
                    className="ic-button"
                  >
                    <UserCheck size={16} /> Confirm Identity
                  </Button>
                </div>
              </div>
            )}

            {!showCamera && !userImagePreview && (
              <Button
                onClick={startCamera}
                variant="primary"
                className="ic-button ic-start-camera-button"
              >
                <Camera size={20} /> Start Camera & Take Picture
              </Button>
            )}
          </>
        )}
      </div>
      <footer className="ic-footer">
        <p>
          © {new Date().getFullYear()} KlearDoc. Secure Identity Verification.
        </p>
      </footer>
    </div>
  );
};

export default IdentityChallengePage;
