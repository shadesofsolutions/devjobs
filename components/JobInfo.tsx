import { Box } from "@chakra-ui/react";
import React from "react";

function JobInfo() {
  return (
    <Box
      _light={{
        bg: "#fff",
      }}
      _dark={{
        bg: "primary.very-dark-blue",
      }}
      borderRadius={"6px"}
      my="30px"
      minH={"600px"}
      p="100"
    ></Box>
  );
}

JobInfo.propTypes = {};

export default JobInfo;
