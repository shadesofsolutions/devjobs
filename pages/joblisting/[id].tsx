import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import {
  DehydratedState,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import CompanyBreif from "../../components/CompanyBreif";
import JobInfo from "../../components/JobInfo";
import LoadingOrError from "../../components/LoadingOrError";
import SEO from "../../components/Seo";
import MainLayout from "../../components/layouts/MainLayout";
import { findSingleJob } from "../../services/findjob.service";
import { PageWithLayout } from "../../types/_types";

const ListingPage: NextPage<{ id: string }> & PageWithLayout = ({ id }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["singleJob", id],
    queryFn: () => findSingleJob(id),
  });

  if (isLoading || isError) {
    return (
      <Container maxW={"container.md"}>
        <LoadingOrError error={error as Error} />
      </Container>
    );
  }
  return (
    <>
      <SEO
        title={`${data?.company_name} - ${data.role}`}
        keywords={data?.keywords?.join(",")}
        description={`${data?.role} at ${data?.company_name}`}
        page_url={`joblisting/${id}`}
        image={data?.logo}
      />
      <Container maxW={"container.md"}>
        <CompanyBreif
          company_logo={data.logo}
          company_name={data.company_name}
          company_website={data.url}
        />
        <JobInfo text={data?.text} tags={data?.keywords} role={data?.role} />
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
            <Heading size="sm">{data?.company_name}</Heading>
            <Text>{data?.url}</Text>
          </Box>
          <Box width={{ base: "100%", sm: "auto" }}>
            <Button
              as="a"
              href={data?.url}
              width={{ base: "100%", sm: "auto" }}
            >
              Apply Now
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

ListingPage.layout = MainLayout;

export default ListingPage;

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
  id: string;
}> = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["singleJob", context.params?.id],
    queryFn: () => findSingleJob(context.params?.id as string),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: context?.params?.id as string,
    },
  };
};
