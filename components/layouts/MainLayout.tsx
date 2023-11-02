import { useUser } from "@auth0/nextjs-auth0";
import {
  Avatar,
  Box,
  Container,
  Flex,
  SkeletonCircle
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import ColorModeToggle from "../ColorModeToggle";
import { Logo } from "../icons";

function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, error } = useUser();

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
          minH={"160px"}
          maxW={"container.brand"}
        >
          <Link href={"/"}>
            <Logo />
          </Link>

          <Flex gap={"10px"} alignItems={"center"}>
            <ColorModeToggle />
            {user && (
              <SkeletonCircle height={"fit-content"} isLoaded={!isLoading}>
                <Avatar src={user?.picture || ""} name={user?.name || ""} />
              </SkeletonCircle>
            )}
          </Flex>
        </Container>
      </Flex>
      {children}
    </Box>
  );
}

MainLayout.propTypes = {};

export default MainLayout;
