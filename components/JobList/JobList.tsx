import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import { useGetJobs } from "../hooks/useRequest";
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

function JobList() {
  const { jobs, error } = useGetJobs("");

  if (!jobs)
    return (
      <JobListContainer>
        {Array.from(new Array(6).keys()).map((i) => (
          <LoadingJobCard key={`loading_ui_${i}`} />
        ))}
      </JobListContainer>
    );
  return (
    <JobListContainer>
      {jobs?.map((job, i) => (
        <JobCard {...job} key={`${job?.createdAt}${i * 2}`} />
      ))}
    </JobListContainer>
  );
}

JobList.propTypes = {};

export default JobList;
