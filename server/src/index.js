import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./data";
import resolvers from "@resolvers";
import typeDefs from "@type-defs";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub, db },
});

server.start(({ port }) => {
  console.log("Server is running on port : ", port);
});
