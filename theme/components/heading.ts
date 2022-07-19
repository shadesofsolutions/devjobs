import { StyleConfig } from "@chakra-ui/theme-tools";

const heading: StyleConfig = {
  baseStyle: ({ colorMode }) => ({
    color: colorMode === "dark" ? "#FFFFFF" : "primary.very-dark-blue",
  }),
  sizes: {
    xl: {
      fontSize: "28px",
      lineHeight: "34px",
    },
    lg: {
      fontSize: "24px",
      lineHeight: "29px",
    },
    md: {
      fontSize: "20px",
      lineHeight: "24px",
    },
    sm: {
      fontSize: "14px",
      lineHeight: "18px",
    },
  },
};

export default heading;
