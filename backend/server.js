// server.js or index.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');

const schema = require('./graphql/schema');
const appointment = require('./graphql/appointment');
const authResolvers = require('./graphql/resolvers/authResolvers');
const appointmentResolvers = require('./graphql/resolvers/appointmentResolvers');
const db = require('./models');

const app = express();
app.use(cors());

const getUserFromToken = (token) => {
  try {
    return token ? jwt.verify(token, process.env.JWT_SECRET) : null;
  } catch {
    return null;
  }
};

// ✅ merge typedefs and resolvers
const typeDefs = mergeTypeDefs([schema,appointment]);
const resolvers = mergeResolvers([authResolvers, appointmentResolvers]);

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1];
      const user = getUserFromToken(token);
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    );
  });
};

startServer();
