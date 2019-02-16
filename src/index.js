const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const ObservationAPI = require('./datasources/observation');
const CommentAPI = require('./datasources/comments');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    observations: new ObservationAPI(),
    comments: new CommentAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
