import { ApolloClient, InMemoryCache } from "@apollo/client";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "https://manggaleh-shop.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "bqQTJbdQJ5schYcWNg007QkfYqTTgtzy8SM9xAc2xRe6fZ5eWiXOZQ8gWF6N6STr",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://manggaleh-shop.hasura.app/v1/graphql",
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": process.env.REACT_APP_API_KEY,
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const apollo = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default apollo;
