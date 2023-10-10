import type { ParsedUrlQuery } from "querystring";
import { FetchBaseQueryError } from "./types/FetchBaseQueryError";
import { PARAMS } from "./types/_types";
import { IFindJobRequestPayload } from "./services/findjob.service";

const dev = process.env.NODE_ENV !== "production";

export const serverUrl = dev
  ? "http://localhost:3002"
  : "https://coderjobs.netlify.app/";

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

const getMessage = (message: any): string | undefined => {
  if (typeof message === "string") return message;
  if (typeof message === "object")
    return message?.message || "Oops an Error Occured";

  return "";
};

export const getErrorMessage = (error: any): string | undefined =>
  isFetchBaseQueryError(error)
    ? getMessage(error.data || error)
    : getMessage(error);

export function objectToQueryString(data: PARAMS = {}): string {
  const queryParameters = [];

  for (const key of Object.keys(data)) {
    if (data[key] !== null && data[key] !== undefined) {
      // Ensure values are properly encoded
      const value = encodeURIComponent(data[key]?.toString() ?? "");
      queryParameters.push(`${key}=${value}`);
    }
  }

  return queryParameters.join("&");
}

export const getPageQuery = (query: ParsedUrlQuery) => {
  let initialQuery: IFindJobRequestPayload = {
    page: 1,
  };
  if (query.page) {
    initialQuery.page = parseInt(query.page as string);
  }
  if (query.search) initialQuery.search = query.search as string;
  if (query.source) initialQuery.source = query.search as string;
  if (query.remote) initialQuery.remote = Boolean(query.remote as string);
  if (query.location) initialQuery.location = query.location as string;
  if (query.employment_type)
    initialQuery.employment_type = query.employment_type as string;

  return initialQuery;
};
