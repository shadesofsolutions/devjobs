import { NextApiRequest, NextApiResponse } from "next";
import { IJobCardProps } from "../../components/JobList/JobCard";
import { v4 } from "uuid";

const dummyJob: IJobCardProps = {
  id:"",
  company_info: {
    company_logo: "MACKBOOK",
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

const ids = [
  'e2212a97-a1d0-4181-ad36-a7721f891682',
  '30e98f53-2eeb-4a6c-a6d7-6656a71fc2c9',
  'f5ef1986-2278-42f0-aba0-7a0a86ca1a46',
  '6498fab2-468a-44c9-8110-7f85e7d20327',
  'b4eef592-5719-4344-aa46-0b2a78312b1a',
  'e4b504a7-2f98-4e39-9e9a-32e50e43a660',
  '43b82e5f-0a50-4d5f-a4e1-44a0f3e43631',
  '67637544-dd4b-4c5a-aac9-7d012556d11d',
  '60d94b6d-136d-4553-9706-41ec7459686b',
  'dee3a43f-21eb-477a-af32-c61977c69625',
  '0a08381a-622c-4c71-b28a-6a0e3bc195f0',
  'a8d30e11-e620-4d3c-80ef-9dab440312d7'
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(200)
    .json(Array.from(Array(12).keys()).map((i) => ({ ...dummyJob, id: ids[i] })));
}
