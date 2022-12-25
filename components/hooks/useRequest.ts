import useSWR from "swr";
import { IJobCardProps } from "../JobList/JobCard";

export const fetcher: <U>(url: string) => Promise<U> = (url: string) =>
  fetch(url).then((res) => res.json());
export const baseUrl = "/api/jobs/";

export const useGetJobs = (path: string = "") => {
  const url = baseUrl + path;

  const { data: jobs, error } = useSWR<IJobCardProps[]>(url, fetcher);

  return { jobs, error };
};
