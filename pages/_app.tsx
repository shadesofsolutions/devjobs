import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Chakra as ChakraProvider } from "../components/Chakra";
import { UserProvider } from "@auth0/nextjs-auth0";
import GlobalFonts from "../theme/GlobalFonts";
import React from "react";
import { NextComponentType, NextPageContext } from "next";
import { PageWithLayout } from "../_types";

interface AppPropsWithComponentWithLayouts extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & PageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithComponentWithLayouts) {
  const Layout =
    Component.layout ||
    (({ children }: { children: React.ReactNode }) => <>{children}</>);

  return (
    <ChakraProvider cookies={pageProps.cookies}>
      <GlobalFonts />
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ChakraProvider>
  );
}

export { getServerSideProps } from "../components/Chakra";

export default MyApp;
