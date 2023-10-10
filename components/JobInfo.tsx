import { Box, Heading, Tag } from "@chakra-ui/react";
import React from "react";
import { v4 } from "uuid";

function JobInfo({
  text,
  tags,
  role,
}: {
  text: string;
  tags?: string[];
  role: string;
}) {
  return (
    <Box
      _light={{
        bg: "#fff",
      }}
      _dark={{
        bg: "primary.very-dark-blue",
        color: "rgb(209, 210, 214)",
      }}
      borderRadius={"6px"}
      my="30px"
      minH={"600px"}
      p="100"
    >
      <Heading as="h1">{role}</Heading>
      <Box my="20px" >
        {tags?.map((tag) => (
          <Tag key={v4()} mr="10px" my="5px">{tag}</Tag>
        ))}
      </Box>
      <Box dangerouslySetInnerHTML={{ __html: text }} />
    </Box>
  );
}

JobInfo.propTypes = {};

export default JobInfo;
