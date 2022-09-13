import { ApolloServer, makeExecutableSchema } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { applyMiddleware } from "graphql-middleware";
import { shield, rule, allow } from "graphql-shield";

require("dotenv").config();
const admins = [
  {
    email: "mohamed.hagras2002@gmail.com",
    password: "onlinestoreadminpanel",
  },
];
const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    const admin = admins.find((admin) => {
      if (
        admin.email === context.headers["email"] &&
        admin.password === context.headers["password"]
      )
        return true;
    });
    return !!admin;
  }
);

const permissions = shield({
  Query: {
    orders: isAuthenticated,
    categories: allow,
    currencies: allow,
    product: allow,
    category: allow,
  },
  Mutation: {
    makeOrder: allow,
    updateOrderStatus: isAuthenticated,
  },
});

const schemaWithPermissions = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  permissions
);
const server = new ApolloServer({
  schema: schemaWithPermissions,
  context: (ctx) => ({
    headers: ctx.req.headers,
  }),
  playground: true,
  introspection: true,
  cors: {
    origin: "*", // <- allow request from all domains
  },
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Graphql server is running at ${url}`);
});
