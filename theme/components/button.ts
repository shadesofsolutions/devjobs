import { StyleConfig } from "@chakra-ui/theme-tools";

const ButtonStyle: StyleConfig = {
  baseStyle: {
    minHeight: "48px",
  },
  variants: {
    solid: {
      bgColor: "primary.violet",
      color: "#fff",
      _hover: {
        bgColor: "primary.light-violet",
      },
    },
    secondary: ({ colorMode }) => ({
      color: colorMode === "dark" ? "#fff" : "primary.violet",
      bgColor:
        colorMode === "dark"
          ? "rgba(255, 255, 255,0.1)"
          : "rgba(89, 100, 224, 0.1)",
      _hover: {
        bgColor:
          colorMode === "dark"
            ? "rgba(255, 255, 255,0.35)"
            : "rgba(89, 100, 224, 0.35)",
      },
    }),
  },

  defaultProps: {
    variant: "solid",
  },
};

export default ButtonStyle;
