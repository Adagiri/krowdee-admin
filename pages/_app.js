import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "20px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 10000000,
    innerWidth: 100,
    outerWidth: 100,
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AlertProvider template={AlertTemplate} {...options}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default MyApp;
