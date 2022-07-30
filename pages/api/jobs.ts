import { NextApiRequest, NextApiResponse } from "next";
import { IJobCardProps } from "../../components/JobList/JobCard";
import { v4 } from "uuid";

const dummyJob: IJobCardProps = {
  id:"",
  company_info: {
    company_logo: "",
    company_brand_color: "blue",
    company_name: "Test Company",
    company_website: "https://test.com",
  },
  job_title: "Fullstack Javascript Developer",
  job_location: "United States",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  employment_type: "full-time",
  equity_offer: 0,
  renumeration_currency: "USD",
  renumeration_currency_symbol: "$",
  annual_renumeration: 500000,
  show_renumaration: false,
  no_of_applicants: 0,
  status: "open",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(200)
    .json(Array.from(Array(12).keys()).map((i) => ({ ...dummyJob, id: v4() })));
}
