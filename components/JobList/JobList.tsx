import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import { IJobInfo } from "../../types/_types";
import JobCard, { LoadingJobCard } from "./JobCard";

const JobListContainer = ({ children }: { children: React.ReactNode }) => (
  <Container
    as={Flex}
    justifyContent="space-evenly"
    flexWrap={"wrap"}
    maxW="container.brand"
    rowGap={"30px"}
    columnGap={"15px"}
    alignItems="flex-start"
    my="30px"
  >
    {children}
  </Container>
);

function JobList({ jobs }: { jobs: IJobInfo[] }) {
  return (
    <JobListContainer>
      {jobs?.map((job, i) => (
        <JobCard
          id={job.id}
          company_info={{
            company_logo: job.logo,
            company_name: job.company_name,
            company_website: job.url,
          }}
          postedAt={job.date_posted}
          job_title={job.role}
          job_location={job.location || ""}
          status="open"
          employment_type={job.employment_type}
          key={job?.id}
        />
      ))}
    </JobListContainer>
  );
}

export const LoadingJobList = () => (
  <JobListContainer>
    {Array.from(new Array(6).keys()).map((i) => (
      <LoadingJobCard key={`loading_ui_${i}`} />
    ))}
  </JobListContainer>
);

JobList.propTypes = {};

export default JobList;
