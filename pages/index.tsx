import { Box, Button, Flex } from "@chakra-ui/react";
import {
  useQuery
} from "@tanstack/react-query";
import { isEqual } from "lodash";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { parse } from "url";
import FilterBox from "../components/FilterBox";
import JobList, { LoadingJobList } from "../components/JobList/JobList";
import LoadingOrError from "../components/LoadingOrError";
import MainLayout from "../components/layouts/MainLayout";
import { IFindJobRequestPayload, findJobs } from "../services/findjob.service";
import styles from "../styles/Home.module.css";
import type { PageWithLayout } from "../types/_types";

const Home: NextPage<{ queryFilters: IFindJobRequestPayload }> &
  PageWithLayout = ({ queryFilters }) => {
  const [filterVal, setFilterVal] = React.useState<IFindJobRequestPayload>({
    location: "",
    search: "",
    employment_type: "",
    ...queryFilters,
    page: queryFilters?.page ? Number(queryFilters?.page) : 1,
  });

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["Job", filterVal],
    queryFn: () => findJobs(filterVal),
  });

  const router = useRouter();

  React.useEffect(() => {
    console.log({
      query: router.query,
      filterVal: { ...filterVal, page: filterVal?.page?.toFixed() },
    });
    if (
      !isEqual(router.query, {
        ...filterVal,
        page: filterVal?.page?.toFixed() || "1",
      })
    ) {
      router?.push({
        pathname: router.pathname,
        query: filterVal as unknown as Record<string, any>,
      });
    }
  }, [filterVal, router]);

  const handleNext = () => {
    if (data?.next) {
      const parsedUrl = parse(data?.next, true);
      setFilterVal((prev) => ({
        ...prev,
        page: parseInt(
          (parsedUrl.query?.page as string) || filterVal?.page?.toFixed()
        ),
      }));
    }
  };

  const handlePrevious = () => {
    if (data?.previous) {
      const parsedUrl = parse(data?.previous, true);
      setFilterVal((prev) => ({
        ...prev,
        page: parseInt(
          (parsedUrl.query?.page as string) || filterVal?.page?.toFixed()
        ),
      }));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dev Jobs</title>
        <meta name="description" content="Search For Jobs Here Bosses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box minH={"100vh"} justifyContent="center" as="main">
        <FilterBox
          filterValue={filterVal}
          onChange={(value) => {
            setFilterVal(value);
          }}
          mt="-40px"
        />
        {isLoading || isError ? (
          <LoadingOrError
            error={error as Error}
            loadingComponent={<LoadingJobList />}
          />
        ) : (
          <JobList jobs={data?.results || []} />
        )}
      </Box>
      <Flex
        justifyContent={"center"}
        mx="auto"
        my="40px"
        width="100%"
        maxW="300px"
      >
        {data?.previous && (
          <Button
            borderRight={"1px"}
            borderRadius={0}
            minW={"100px"}
            width={"50%"}
            onClick={handlePrevious}
          >
            Previous (pg {filterVal?.page - 1})
          </Button>
        )}
        {data?.next && (
          <Button
            borderRadius={0}
            minW={"100px"}
            width={"50%"}
            onClick={handleNext}
          >
            Next (pg {filterVal?.page + 1})
          </Button>
        )}
      </Flex>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<{
//   dehydratedState: DehydratedState;
//   queryFilters: IFindJobRequestPayload;
// }> = async (context) => {
//   const queryFilters = getPageQuery(context.query);
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["Job", queryFilters],
//     queryFn: () => findJobs(queryFilters),
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       queryFilters,
//     },
//   };
// };

Home.layout = MainLayout;
export default Home;
