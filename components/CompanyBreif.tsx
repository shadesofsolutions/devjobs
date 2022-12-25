import React from "react";
import { ICompanyInfo } from "../_types";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

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
    mt="-60px"
    alignItems={"center"}
    borderRadius="6px"
    flexFlow={{ base: "column", sm: "row" }}
    textAlign={{ base: "center", sm: "left" }}
  >
    <Flex
      justifyContent={"center"}
      alignItems="center"
      height={{ base: "50px", sm: "140px" }}
      width={{ base: "50px", sm: "140px" }}
      borderRadius={{ base: "15px", sm: "0px" }}
      bg={company_brand_color}
      flexShrink={0}
      marginTop={{ base: "-25px", sm: "0px" }}
    >
      <Text fontSize={{ base: "5px", sm: "16px" }} color="#fff">
        {company_logo}
      </Text>
    </Flex>
    <Flex
      px="10"
      py="4"
      width={"100%"}
      alignItems={"center"}
      justifyContent="space-between"
      flexFlow={{ base: "column", sm: "row" }}
    >
      <Box my={{ base: "20px", sm: "0px" }}>
        <Heading my={{ base: "10px", sm: "0px" }} size="sm">
          {company_name}
        </Heading>
        <Text>{company_website}</Text>
      </Box>
      <Box>
        <Button color="primary.violet" variant={"secondary"}>
          Company Site
        </Button>
      </Box>
    </Flex>
  </Flex>
);

export default CompanyBreif;
