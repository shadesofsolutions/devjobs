export const APP_CONFIG = {
  ENVIRONMENT: {
    development: process.env.NODE_ENV === "development",
    production: process.env.NODE_ENV === "production",
  },
  BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL || "",
  API_KEY: process.env.NEXT_PUBLIC_BASE_API_KEY || "",
};
