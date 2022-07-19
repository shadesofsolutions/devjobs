import React from "react";
import { HStack, Switch, useColorMode } from "@chakra-ui/react";
import { HalfMoonIcon, SunshineIcon } from "./icons";
import theme from "../theme";

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack>
      <SunshineIcon />
      <Switch
        isChecked={colorMode === theme.config.initialColorMode}
        onChange={toggleColorMode}
        borderRadius="20px"
        size={"md"}
        sx={{
          "span.chakra-switch__track": {
            backgroundColor: "#fff",
          },
          "span.chakra-switch__thumb": {
            bgColor: "primary.violet",
          },
          "span.chakra-switch__thumb:hover": {
            bgColor: "primary.light-violet",
          },
        }}
      />
      <HalfMoonIcon />
    </HStack>
  );
}

ColorModeToggle.propTypes = {};

export default ColorModeToggle;
