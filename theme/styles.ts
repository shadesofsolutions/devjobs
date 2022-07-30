import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

export default {
    global: (props: StyleFunctionProps) => ({
        body: {
          fontSize: "16px",
          lineHeight: "26px",
          color: "secondary.dark-grey",
          background: mode("secondary.light-grey", "primary.midnight")(props),
          transitionProperty: "background-color",
          transitionDuration: "normal",
        },
        h1: {
          fontSize: "28px",
          lineHeight: "34px",
        },
        h2: {
          fontSize: "24px",
          lineHeight: "29px",
        },
        h3: {
          fontSize: "20px",
          lineHeight: "24px",
        },
        h4: {
          fontSize: "14px",
          lineHeight: "18px",
        },
      }),
};
