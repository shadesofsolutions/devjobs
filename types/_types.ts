import React from "react";

export type PageWithLayout = {
  layout?: React.FC<{ children: React.ReactNode }>;
};

export interface IJobInfo {
  id: string;
  role: string;
  company_name: string;
  company_num_employees: number | null;
  employment_type: string;
  location: null;
  remote: boolean;
  logo: string;
  url: string;
  text: string;
  date_posted: string;
  keywords: string[];
  source: string;
}

export interface ICompanyInfo {
  company_logo: string;
  company_brand_color?: string;
  company_website?: string;
  company_name: string;
}

export type PARAMS = Record<string, number | string | null | undefined>;
export type Indexable<U> = { [index: string]: U };
