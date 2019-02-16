const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const ObservationAPI = require('./datasources/observation');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    observations: new ObservationAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
