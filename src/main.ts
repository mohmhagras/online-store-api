import { ApolloServer, makeExecutableSchema } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { applyMiddleware } from "graphql-middleware";
import { shield, rule } from "graphql-shield";
import connectDB from "./config/dbConnection";
import mongoose from "mongoose";

require("dotenv").config();

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return !!context.headers["email"];
  }
);

const permissions = shield({
  Query: {
    orders: isAuthenticated,
  },
  Mutation: {},
});

const schemaWithPermissions = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  permissions
);
const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context: (ctx) => ({
    headers: ctx.req.headers,
  }),
  playground: true,
  introspection: true,
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Graphql server is running at ${url}`);
});
