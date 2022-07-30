import { NextPage } from "next";
import React from "react";

export type PageWithLayout = {
  layout?: React.FC<{ children: React.ReactNode }>;
};

export interface ICompanyInfo {
  company_logo: string;
  company_brand_color: string;
  company_website?: string;
  company_name: string;
}
