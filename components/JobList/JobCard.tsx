import {
  Avatar,
  AvatarProps,
  Box,
  BoxProps,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ICompanyInfo } from "../../_types";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

export interface IJobCardProps {
  id?: string;
  company_info: ICompanyInfo;
  job_title: string;
  createdAt: string;
  updatedAt: string;
  status: "open" | "closed";
  annual_renumeration: number;
  renumeration_currency: string;
  renumeration_currency_symbol?: string;
  equity_offer: number;
  show_renumaration: boolean;
  no_of_applicants?: number;
  job_location: string;
  employment_type: "part-time" | "full-time" | "contract";
}

const companyAvatarStyle: AvatarProps = {
  position: "absolute",
  top: "-16px",
  left: "32px",
  width: "50px",
  height: "50px",
  borderRadius: "15px",
};

const jobCardStyle: BoxProps = {
  width: "100%",
  p: "32px",
  maxW: "350px",
  flex: { base: "0 100%", brsm: "1 32%" },
  flexGrow: "1",
  borderRadius: "6px",
  position: "relative",
  minH: "228px",
  display: "flex",
  flexFlow: "column",
  minW: { base: "auto", md: "345px", lg: "auto" },
};

function JobCard({
  id,
  company_info,
  createdAt,
  employment_type,
  job_title,
  job_location,
}: IJobCardProps) {
  const cardBg = useColorModeValue("#fff", "primary.very-dark-blue");
  const { company_logo, company_name, company_brand_color } = company_info;
  const router = useRouter()
  return (
    <Box onClick={()=> router.push(`/joblisting/${id}`)} cursor={"pointer"} bgColor={cardBg} {...jobCardStyle}>
      <Avatar
        bgColor={company_brand_color}
        name={company_name}
        src={company_logo}
        {...companyAvatarStyle}
        color="#fff"
        fontSize={"14px"}
      />
      <Box mt="24px">
        <Text>
          <Text as="span">{dayjs().to(dayjs(createdAt))}</Text>.
          <Text as="span">{employment_type}</Text>
        </Text>
        <Heading my="16px" as="h3" size="md">
          {job_title}
        </Heading>
        <Text>{company_name}</Text>
      </Box>

      <Text mt="auto" color={"primary.violet"}>
        {job_location}
      </Text>
    </Box>
  );
}

export function LoadingJobCard() {
  const cardBg = useColorModeValue("#fff", "primary.very-dark-blue");

  return (
    <Box
      width="100%"
      p="32px"
      maxW={"350px"}
      bgColor={cardBg}
      borderRadius="6px"
      position={"relative"}
      minH="228px"
      {...jobCardStyle}
    >
      <SkeletonCircle {...companyAvatarStyle} />
      <Box mt="24px">
        <SkeletonText width={"150px"} noOfLines={1} />
        <SkeletonText my="16px" as="h3" noOfLines={1} />
        <SkeletonText width={"70px"} noOfLines={1} />
      </Box>

      <SkeletonText width="100px" mt="auto" noOfLines={1} />
    </Box>
  );
}

JobCard.propTypes = {};

export default JobCard;
