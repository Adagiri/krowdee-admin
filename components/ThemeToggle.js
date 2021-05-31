import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { IconButton } from "@chakra-ui/button";
import { BiMoon, BiSun } from "react-icons/bi";
import { Box } from "@chakra-ui/layout";

const ThemeToggle = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box>
      <IconButton
        onClick={toggleColorMode}
        aria-label="toggle-dark-mode-button"
        size="sm"
        icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
      />
    </Box>
  );
};

export default ThemeToggle;
