// theme/index.js
import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Foundational style overrides
import colors from "./foundation/colors";
import fonts from "./foundation/fonts";

// Component style overrides
import Button from "./components/button";
import Heading from "./components/heading";

// color mode config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const overrides = {
  config,
  fonts,
  styles,
  colors,
  components: {
    Button,
    Heading,
  },
};

export default extendTheme(overrides);
