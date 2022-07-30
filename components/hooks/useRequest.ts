import useSWR from "swr";
import { IJobCardProps } from "../JobList/JobCard";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
const baseUrl = "/api/jobs/";

export const useGetJobs = (path: string = "") => {
 

  const url = baseUrl + path;

  const { data: jobs, error } = useSWR<IJobCardProps[]>(url, fetcher);

  return { jobs, error };
};
