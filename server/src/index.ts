require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { DatabaseInit } from "orm";
import { typeDefs, resolvers } from "interface";
import { AuthScope } from "services";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    auth: await AuthScope(req.headers.authorization || ""),
  }),
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground], // NOTE: only for purely local playground
  debug: <string>process.env.TS_NODE_DEV === "true",
});

// Initialize the server
(async function () {
  try {
    await DatabaseInit();
    const { url } = await server.listen();

    console.log(`🚀  Server ready at ${url}`);
  } catch (err) {
    console.log("Server failed to launch", err);
  }
})();
