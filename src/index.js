const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const VahtiAPI = require('./datasources/vahti-api');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    vahtiAPI: new VahtiAPI(),
  }),
 });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});