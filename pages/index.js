import { Badge, Box, Container, Flex, Text } from "@chakra-ui/layout";
import { HiOutlineLockClosed, HiOutlinePencilAlt } from "react-icons/hi";
import { RiOpenSourceLine, RiSpeakerLine } from "react-icons/ri";
import { useBreakpointValue, useMediaQuery } from "@chakra-ui/media-query";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Head from "next/head";
import Link from "next/link";
import DashNav from "../components/DashNav";
import AuthWrapper from "../components/AuthWrapper";
import { getUser } from "../helper/auth";

const index = () => {
  const [smAndUp] = useMediaQuery("(min-width: 479px)");
  const buttonSize = useBreakpointValue({ base: "xs", sm: "sm" });
  const iconSize = useBreakpointValue({ base: "16px", sm: "18px" });

  const user = getUser();

  return (
    <Box>
      <Head>
        <title>Admin | Krowdee! </title>
      </Head>
      <DashNav />
      <Box h={{ base: "91vh", sm: "90vh" }} w="100%">
        <Container maxW="container.lg" h="full">
          <Text>Welcome <Badge colorScheme="green">{user.username}</Badge></Text>
          <Text>Get to work now!!, there is no time</Text>
          <Text>Click on Tasks below. HOP ON</Text>
          <Flex mt="12px" justify="space-evenly" align="center" mb={3} h="full">
            <Link href="/tasks">
              <Button
                cursor="pointer"
                size="lg"
                // bgGradient={useColorModeValue(null, "linear(#0987A0, #054450)")}
                // _hover={{
                //   bgGradient: useColorModeValue(
                //     null,
                //     "linear(#0987A0, #054450)"
                //   ),
                // }}
                colorScheme="blue"
                // leftIcon={<RiSpeakerLine size={smAndUp ? "18px" : "14px"} />}
              >
                Tasks
              </Button>
            </Link>
            {/* <Link href="/hosts">
              <Button
        
                cursor="pointer"
                size="md"
                colorScheme="blue"
                // bgGradient={useColorModeValue("#eee", "linear(#0987A0, #054450)")}
                // _hover={{
                //   bgGradient: useColorModeValue(
                //     null,
                //     "linear(#0987A0, #054450)"
                //   ),
                // }}
                // leftIcon={<RiSpeakerLine size={smAndUp ? "18px" : "14px"} />}
              >
                Hosts
              </Button>
            </Link> */}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default AuthWrapper(index);
