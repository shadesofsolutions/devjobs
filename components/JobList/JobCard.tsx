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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { ICompanyInfo } from "../../types/_types";
import NoSSR from "../NoSSR";

dayjs.extend(relativeTime);

export interface IJobCardProps {
  id?: string;
  company_info: ICompanyInfo;
  job_title: string;
  postedAt: string;
  status: "open" | "closed";
  job_location?: string;
  employment_type: string;
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
  minH: "270px",
  display: "flex",
  flexFlow: "column",
  minW: { base: "auto", md: "345px", lg: "auto" },
};

function JobCard({
  id,
  company_info,
  postedAt,
  employment_type,
  job_title,
  job_location,
}: IJobCardProps) {
  const cardBg = useColorModeValue("#fff", "primary.very-dark-blue");
  const { company_logo, company_name, company_brand_color } = company_info;

  return (
    <Box
      as={Link}
      href={`/joblisting/${id}`}
      cursor={"pointer"}
      bgColor={cardBg}
      {...jobCardStyle}
    >
      <Avatar
        bgColor={company_brand_color || "orange"}
        name={company_name}
        src={company_logo}
        {...companyAvatarStyle}
        color="#fff"
        fontSize={"14px"}
      />
      <Box mt="24px">
        <Text>
          <NoSSR>
            <Text as="span">{dayjs().to(dayjs(postedAt))}</Text>
          </NoSSR>

          <Text
            display={"inline-block"}
            as="span"
            mx="10px"
            w={"5px"}
            h="5px"
            borderRadius={"100%"}
            bgColor={"secondary.dark-grey"}
          ></Text>
          <Text as="span">{employment_type}</Text>
        </Text>
        <Heading
          my="16px"
          as="h3"
          size="md"
          maxHeight={"72px"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          className="clamped"
        >
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
