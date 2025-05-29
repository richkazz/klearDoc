export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://localhost:5001";
export const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash-exp";
export const TOKEN_KEY = "authToken"; // Key for storing token in localStorage
export const USER_KEY = "authUser"; // Key for storing user data in localStorage

export const TRANSCRIPTION_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    transcription: { type: "string" },
  },
  required: ["transcription"],
};
