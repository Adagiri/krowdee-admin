import {
  Box,
  Center,
  Badge,
  Container,
  Flex,
  Text,
  Grid,
} from "@chakra-ui/layout";
import AuthWrapper from "../components/AuthWrapper";

import {
  SearchIcon,
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { useBreakpointValue, useMediaQuery } from "@chakra-ui/media-query";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoNotifications } from "react-icons/io5";
import {
  RiDashboardLine,
  RiMoonLine,
  RiMoreFill,
  RiPencilLine,
  RiSunLine,
  RiTrophyFill,
  RiUser6Line,
} from "react-icons/ri";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ThemeToggle from "../components/ThemeToggle";
import DashNav from "../components/DashNav";
import Head from "next/head";
// import ThemeToggle from "../components/ThemeToggle";

const hosts = () => {
  const buttonSize = useBreakpointValue({ base: "xs", sm: "sm" });
  const iconSize = useBreakpointValue({ base: "18px", sm: "20px" });
  const buttonType = useBreakpointValue({ base: IconButton, sm: Button });
  const [smAndUp] = useMediaQuery("(min-width: 479px)");
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <Box >
       <Head>
        <title>Hosts | Krowdee! </title>
      </Head>
      <DashNav />
      
    </Box>
  );
};

export default AuthWrapper(hosts);
