import React from "react";
import type { NextPage } from "next";
import { ICompanyInfo, PageWithLayout } from "../../_types";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import MainLayout from "../../components/layouts/MainLayout";
import { IJobCardProps } from "../../components/JobList/JobCard";
import { fetcher } from "../../components/hooks/useRequest";

const ListingPage: NextPage<IJobCardProps> & PageWithLayout = ({
  company_info,
}) => {
  return (
    <Container maxW={"container.md"}>
      <CompanyBreif {...company_info} />
    </Container>
  );
};

const CompanyBreif = ({
  company_logo,
  company_brand_color,
  company_name,
  company_website,
}: ICompanyInfo) => (
  <Flex
    minH={"140px"}
    _dark={{ bg: "primary.very-dark-blue" }}
    _light={{ bg: "#fff" }}
  >
    <Box height={"140px"} width={"140px"} bg={company_brand_color}>
      {company_logo}
    </Box>
    <Flex alignItems={"center"} p="24px">
      <Heading size="sm">{company_name}</Heading>
      <Text>{company_website}</Text>
    </Flex>
    <Box>
      <Button variant={"secondary"}>Company Site</Button>
    </Box>
  </Flex>
);

ListingPage.layout = MainLayout;

export default ListingPage;

const getJobListingIds = async () => {
  let data: IJobCardProps[] = [];
  try {
    data = await fetcher("/api/jobs");
  } catch (err) {}

  return data?.map((job) => ({
    params: {
      id: job?.id,
    },
  }));
};

// export async function getStaticPaths() {
//   const paths = getJobListingIds();
//   // Return a list of possible value for id
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the blog post using params.id
// }
