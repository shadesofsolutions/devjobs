const dev = process.env.NODE_ENV !== "production";

export const serverUrl = dev
  ? "http://localhost:3002"
  : "https://coderjobs.netlify.app/";
