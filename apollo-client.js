import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

import { cache } from "./state/cache";

const link = createHttpLink({
  uri: "http://admin.server.krowdee.com/graphql",
  credentials: "include",
  connectToDevTools: true,
});

const client = new ApolloClient({
  link,
  cache,
  credentials: "include"
});

export default client;;
