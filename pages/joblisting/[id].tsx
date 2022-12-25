import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import type {
  GetStaticPaths,
  GetStaticProps,
  NextApiRequest,
  NextPage,
} from "next";
import CompanyBreif from "../../components/CompanyBreif";
import { baseUrl, fetcher } from "../../components/hooks/useRequest";
import JobInfo from "../../components/JobInfo";
import { IJobCardProps } from "../../components/JobList/JobCard";
import MainLayout from "../../components/layouts/MainLayout";
import { serverUrl } from "../../utils";
import { ICompanyInfo, PageWithLayout } from "../../_types";

const ListingPage: NextPage<IJobCardProps> & PageWithLayout = ({
  company_info,
}) => {
  return (
    <>
      <Container maxW={"container.md"}>
        <CompanyBreif {...company_info} />
        <JobInfo />
      </Container>
      <Box
        _light={{
          bg: "#fff",
        }}
        _dark={{
          bg: "primary.very-dark-blue",
        }}
        minH={"100px"}
        w="100%"
      >
        <Container
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
          maxW={"container.md"}
          py="20px"
        >
          <Box display={{ base: "none", sm: "block" }}>
            <Heading size="sm">{company_info?.company_name}</Heading>
            <Text>{company_info?.company_website}</Text>
          </Box>
          <Box width={{ base: "100%", sm: "auto" }}>
            <Button width={{ base: "100%", sm: "auto" }}>Apply Now</Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

ListingPage.layout = MainLayout;

export default ListingPage;

const getJobListingIds = async () => {
  const jobs = await fetcher<IJobCardProps[]>(`${serverUrl}${baseUrl}`);
  const paths = jobs?.map((job) => ({
    params: {
      id: job?.id,
    },
  }));

  return paths;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getJobListingIds();
  // Return a list of possible value for id
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the blog post using params.id
  const jobs = await fetcher<IJobCardProps[]>(`${serverUrl}${baseUrl}`);
  const jobInfo = jobs.find((job) => job.id === params?.id);

  if (!jobInfo) {
    return {
      notFound: true,
    };
  }

  return {
    props: jobInfo,
  };
};
