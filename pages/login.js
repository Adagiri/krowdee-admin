import { Box, Center, Container, Text } from "@chakra-ui/layout";
import ThemeToggle from "../components/ThemeToggle";
import MotionBox from "../components/MotionBox";
import { Button, IconButton } from "@chakra-ui/button";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  FormControl,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { Image } from "@chakra-ui/image";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { authenticate, getToken, setToken, setUser } from "../helper/auth";
import Router from "next/router";
import { LOGIN } from "../state/remote/mutations";
import { useAlert } from "react-alert";

const Login = () => {
  const alert = useAlert();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = uEeState(initialState);
  // const router = useRouter();

  const [login, { loading }] = useMutation(LOGIN);
  useEffect(() => {
    const token = getToken("token");
    if (!!token) {
      Router.push("/");
    }
  }, []);

  return (
    <div>
      <Container maxW="xs">
        <Box textAlign="right" pt={{ base: "4", sm: "3" }}>
          <ThemeToggle />
        </Box>
        <Center height="83vh" width="100%">
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{
              transform: "translateY(15px)",
              opacity: 1,
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 400,
              bounce: 0.25,
            }}
          >
            <Box>
              <Image
                m="0 auto"
                boxSize="40px"
                objectFit="cover"
                src="/images/krowdee-logo.svg"
                alt="logo"
              />
              <Text
                fontSize="25px"
                mt={5}
                fontWeight="medium"
                textAlign="center"
              >
                Login - Admin
              </Text>
            </Box>

            <Box mt={3}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  login({ variables: { username, password } })
                    .then(async (data) => {
                      setToken("token", data.data.login.token);
                      setUser(data.data.login.user);
                      Router.push("/");
                      alert.show("login successful", { type: "success" });
                    })
                    .catch((error) => {
                      console.log(error);
                      alert.show(error.message, { type: "error" });
                    });
                  setUsername("");
                  setPassword("");
                }}
              >
                <FormControl isRequired>
                  <Input
                    placeholder="username"
                    type="username"
                    size="md"
                    borderRadius="base"
                    mb={3}
                    disabled={loading}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <Input
                    placeholder="password"
                    size="md"
                    type="password"
                    borderRadius="base"
                    disabled={loading}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>

                <Box mt={4}>
                  <Button
                    variant="solid"
                    colorScheme="brand"
                    size="md"
                    isFullWidth
                    isLoading={loading}
                    loadingText="verifying"
                    type="submit"
                    // onClick={() => setAlert(true)}
                  >
                    Log in
                  </Button>
                </Box>
              </form>
            </Box>
          </MotionBox>
        </Center>
      </Container>
    </div>
  );
};

export default Login;
