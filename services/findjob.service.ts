import { APP_CONFIG } from "../config/_app_config";
import { IJobInfo, PARAMS } from "../types/_types";
import { objectToQueryString } from "../utils";
import { authHeader, handleResponseError } from "./common";

export interface IFindJobResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IJobInfo[];
}

export interface IFindJobRequestPayload {
  page: number;
  search?: string;
  source?: string;
  location?: string;
  remote?: boolean;
  company_num_employees?: string;
  employment_type?: string;
  order_by?: string;
}

export async function findJobs(
  queryParams: IFindJobRequestPayload
): Promise<IFindJobResponse> {
  const response = await fetch(
    `https://cors-proxy-6r45.onrender.com/?url=${
      APP_CONFIG.BASE_API_URL
    }?${objectToQueryString(queryParams as unknown as PARAMS)}&format=json`,
    {
      headers: authHeader,
    }
  );

  handleResponseError(response);
  return response.json() as Promise<IFindJobResponse>;
}

export async function findSingleJob(jobId: string): Promise<IJobInfo> {
  const response = await fetch(
    `https://cors-proxy-6r45.onrender.com/?url=${APP_CONFIG.BASE_API_URL}${jobId}/?format=json`,
    {
      headers: authHeader,
    }
  );

  handleResponseError(response);
  return response.json() as Promise<IJobInfo>;
}
