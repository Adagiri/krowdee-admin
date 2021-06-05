import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { cache } from "./state/cache";

const link = createHttpLink({
  uri: "http://localhost:9000/graphql",
  credentials: "include",
  connectToDevTools: true,
});

const client = new ApolloClient({
  link,
  cache,
});

export default client;
