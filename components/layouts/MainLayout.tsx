import React from "react";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import ColorModeToggle from "../ColorModeToggle";
import { Logo } from "../icons";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Flex
        w="100%"
        minH={"160px"}
        bgImage={"/header.png"}
        backgroundSize="100% 100%"
        bgRepeat={"no-repeat"}
        alignItems="center"
      >
        <Container
          alignItems="center"
          justifyContent={"space-between"}
          width={"100%"}
          as={Flex}
          maxW={"container.brand"}
        >
          <Logo />
          <ColorModeToggle />
        </Container>
      </Flex>
      {children}
    </Box>
  );
}

MainLayout.propTypes = {};

export default MainLayout;
