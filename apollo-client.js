import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { cache } from "./state/cache";

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URI,
  credentials: "include",
  connectToDevTools: true,
});

const client = new ApolloClient({
  link,
  cache,
});

export default client;
