import { APP_CONFIG } from "../config/_app_config";

export const authHeader = {
  "content-type": "application/json",
  Authorization: `Token ${APP_CONFIG.API_KEY}`,
};

const SERVER_ERROR = 500;
const NOT_FOUND = 404;

export function handleResponseError(response: Response): void {
  if (!response.ok) {
    // Handle the error based on the status code
    if (response.status === NOT_FOUND) {
      // Handle a "Not Found" error
      throw new Error("Resource not found");
    } else if (response.status === SERVER_ERROR) {
      // Handle a "Internal Server Error" error
      throw new Error("Internal Server Error");
    } else {
      // Handle other HTTP error codes
      throw new Error(`HTTP Error: ${response.status}`);
    }
  }
}
