import { rule } from "graphql-shield";

export const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return !!context.headers["email"];
  }
);
