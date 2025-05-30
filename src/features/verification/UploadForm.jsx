// src/features/verification/UploadForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Camera, FileText, RotateCcw } from "lucide-react"; // Added RotateCcw
import Button from "../../components/Button"; // Assuming you have this
import { requiresImage as checkRequiresImage } from "../../utils/documentTypeUtils";
// Optional: Create UploadFormCamera.css for styling camera elements if needed
// import './UploadFormCamera.css';

const CustomFileInput = ({ id, label, onChange, accept, fileName, icon }) => {
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
  const [kdid, setKdid] = useState("");

  // Camera-specific state for user image
  const [userImagePreview, setUserImagePreview] = useState(null);
  const [stream, setStream] = useState(null);
  const [showUserCamera, setShowUserCamera] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const requiresUserImage = checkRequiresImage(selectedDocType.value);

  const startUserCamera = async () => {
    setCameraError("");
    // Clear previous image/preview when starting camera
    setUserImageFile(null);
    setUserImagePreview(null);
    setShowUserCamera(true);
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
      setCameraError(
        "Could not access camera. Please ensure permissions are granted and try again."
      );
      setShowUserCamera(false);
    }
  };

  const stopUserCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setShowUserCamera(false); // Ensure camera view is hidden
  };

  const captureUserImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `user-capture-${Date.now()}.png`, {
            type: "image/png",
          });
          setUserImageFile(file);
          setUserImagePreview(URL.createObjectURL(file));
          stopUserCamera(); // Close camera after capture
        }
      }, "image/png");
    }
  };

  const handleUserImageRetake = () => {
    // userImageFile and userImagePreview are cleared in startUserCamera
    startUserCamera(); // Restart camera for retake
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!documentFile) {
      alert("Please select the document file.");
      return;
    }
    if (requiresUserImage && !userImageFile) {
      alert("Please take a live face picture for this document type.");
      return;
    }
    if (!kdid.trim()) {
      alert("Please enter the KDID.");
      return;
    }
    onSubmit({
      documentFile,
      userImageFile: requiresUserImage ? userImageFile : null,
      kdid,
    });
  };

  // Cleanup camera stream on component unmount
  useEffect(() => {
    return () => {
      stopUserCamera();
      // Revoke object URL if a preview was generated
      if (userImagePreview) {
        URL.revokeObjectURL(userImagePreview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userImagePreview]); // Add userImagePreview to deps for revokeObjectURL

  // Effect to manage camera state when selectedDocType or its image requirement changes
  useEffect(() => {
    if (!requiresUserImage) {
      stopUserCamera();
      setUserImageFile(null);
      if (userImagePreview) {
        URL.revokeObjectURL(userImagePreview);
      }
      setUserImagePreview(null);
      setCameraError(""); // Clear any camera errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiresUserImage, selectedDocType.value]); // Rerun if doc type value changes

  return (
    <div className="upload-form">
      <h2>2. Upload: {selectedDocType.displayName}</h2>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Upload your document{" "}
        {requiresUserImage ? "and take a live face picture" : ""}. Ensure images
        are clear.
      </p>
      <form onSubmit={handleSubmit}>
        <CustomFileInput
          id="documentFile"
          label="Document File"
          icon={<FileText size={20} style={{ marginRight: "8px" }} />}
          onChange={(e) => {
            setDocumentFile(e.target.files[0] || null);
          }}
          accept="image/*,.pdf"
          fileName={documentFile?.name}
        />

        {requiresUserImage && (
          <div
            className="form-group user-image-capture-section"
            style={{
              marginTop: "20px",
              border: "1px solid #eee",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              Your Face Picture (Live Capture)
            </label>
            {cameraError && (
              <p
                className="error-message"
                style={{ color: "red", marginBottom: "10px" }}
              >
                {cameraError}
              </p>
            )}

            {!showUserCamera && !userImagePreview && (
              <Button
                type="button"
                onClick={startUserCamera}
                variant="secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Camera size={18} style={{ marginRight: "8px" }} /> Open Camera
                & Take Picture
              </Button>
            )}

            {showUserCamera && !userImagePreview && (
              <div
                className="camera-view"
                style={{
                  marginTop: "10px",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    display: "block",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                ></video>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    type="button"
                    onClick={captureUserImage}
                    variant="primary"
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <Camera size={16} style={{ marginRight: "8px" }} /> Capture
                  </Button>
                  <Button
                    type="button"
                    onClick={stopUserCamera}
                    variant="secondary"
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {userImagePreview && (
              <div
                className="image-preview-container"
                style={{ marginTop: "10px", textAlign: "center" }}
              >
                <p style={{ marginBottom: "5px", fontWeight: "500" }}>
                  Face Picture Preview:
                </p>
                <img
                  src={userImagePreview}
                  alt="Captured face"
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                    height: "auto",
                    display: "block",
                    marginBottom: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    margin: "0 auto",
                  }}
                />
                <Button
                  type="button"
                  onClick={handleUserImageRetake}
                  variant="secondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    margin: "10px auto 0 auto",
                  }}
                >
                  <RotateCcw size={16} style={{ marginRight: "8px" }} /> Retake
                  Picture
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="form-group" style={{ marginTop: "20px" }}>
          <label htmlFor="kdid">KDID (KlearDoc ID)</label>
          <input
            type="text"
            id="kdid"
            value={kdid}
            onChange={(e) => setKdid(e.target.value)}
            placeholder="Enter your KDID (e.g., 0987654321)"
            required
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>

        <div className="form-actions" style={{ marginTop: "30px" }}>
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
              (requiresUserImage && !userImageFile) ||
              !kdid.trim() // Also ensure kdid is not just whitespace
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
