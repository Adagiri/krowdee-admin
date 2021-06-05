import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Badge, Box, Container, Flex, Text } from "@chakra-ui/layout";
import { useBreakpointValue, useMediaQuery } from "@chakra-ui/media-query";
import Router from "next/router";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import ThemeToggle from "./ThemeToggle";
import { deleteToken } from "../helper/auth";
import client from "../apollo-client";

const DashNav = () => {
  const buttonSize = useBreakpointValue({ base: "xs", sm: "sm" });
  const iconSize = useBreakpointValue({ base: "18px", sm: "20px" });
  const buttonType = useBreakpointValue({ base: IconButton, sm: Button });
  const [smAndUp] = useMediaQuery("(min-width: 479px)");
  // const router = useRouter();

  return (
    <Box
      Box
      w="100%"
      h={{ base: "7vh", sm: "8vh" }}
      d="flex"
      alignItems="center"
    >
      <Container maxW="container.lg">
        <Flex minWidth="80%" justify="space-around" align="center">
          <Button
            variant="ghost"
            colorScheme="brand"
            size={buttonSize}
            px={{ base: 0, sm: "12px" }}
            aria-label={smAndUp ? "trophy" : null}
            // icon={smAndUp ? null : <FaHome size="18px" size={iconSize} />}
            leftIcon={<FaHome size="20px" />}
            onClick={() => Router.push("/")}
          >
            Home
          </Button>

          <Button
            variant="ghost"
            colorScheme="brand"
            size={buttonSize}
            px={{ base: 0, sm: "12px" }}
            aria-label={smAndUp ? "trophy" : null}
            // icon={<BiLogOut size="20px" size={iconSize} />}
            // rightIcon={<BiLogOut size="20px" />}
            onClick={() => {
              client.resetStore();
              deleteToken("token")
              Router.push("/login");
            }}
          >
            Logout
          </Button>
        </Flex>
        <Box position="absolute" top={3} right={3} mr={3}>
          <ThemeToggle />
        </Box>
      </Container>
    </Box>
  );
};

export default DashNav;
