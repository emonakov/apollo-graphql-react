require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const ItemAPI = require('./datasources/item');
const UserAPI = require('./datasources/user');

const store = createStore();

const dataSources = () => ({
  itemAPI: new ItemAPI({ store }),
  userAPI: new UserAPI({ store }),
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || '';
  const userName = Buffer.from(auth, 'base64').toString('ascii');

  // find a user by their email
  const user = await store.users.findOne({ where: { userName } });

  return { user };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

server.listen().then(() => {
  console.log(`
      Server is running!
      Listening on port 4000
      Query at https://studio.apollographql.com/dev
    `);
});
