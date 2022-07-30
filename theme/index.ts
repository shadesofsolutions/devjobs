// theme/index.js
import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Foundational style overrides
import colors from "./foundation/colors";
import fonts from "./foundation/fonts";
import sizes from "./foundation/sizes";
import breakpoints from "./foundation/breakpoints";

// Component style overrides
import Button from "./components/button";
import Heading from "./components/heading";
import Input from "./components/input";

// color mode config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const overrides = {
  config,
  sizes,
  breakpoints,
  fonts,
  styles,
  colors,
  components: {
    Button,
    Heading,
    Input,
  },
};

export default extendTheme(overrides);
