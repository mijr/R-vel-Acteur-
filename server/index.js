const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { sequelize } = require("./models");
require("dotenv").config();

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // extract user from token if needed
      return {};
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, async () => {
    console.log("🚀 Server ready at http://localhost:4000/graphql");
    await sequelize.authenticate();
    console.log("✅ Database connected!");
  });
}

startServer();
