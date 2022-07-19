import { Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../components/layouts/MainLayout";
import styles from "../styles/Home.module.css";
import { PageWithLayout } from "../_types";

const Home: NextPage & PageWithLayout = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dev Jobs</title>
        <meta name="description" content="Search For Jobs Here Bosses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        minH={"100vh"}
        justifyContent="center"
        alignItems="center"
        as="main"
      >
        <Heading>DEV JOBS!!!!</Heading>
      </Flex>
    </div>
  );
};

Home.layout = MainLayout;
export default Home;
