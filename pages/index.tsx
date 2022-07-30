import { Box, Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import FilterBox, { IFilterValue } from "../components/FilterBox";
import JobList from "../components/JobList/JobList";
import MainLayout from "../components/layouts/MainLayout";
import styles from "../styles/Home.module.css";
import { PageWithLayout } from "../_types";

const Home: NextPage & PageWithLayout = () => {
  const [filterVal, setFilterVal] = React.useState<IFilterValue>({
    location: "",
    query: "",
    isFullTime: false,
  });

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
        <JobList />
      </Box>
    </div>
  );
};

Home.layout = MainLayout;
export default Home;
