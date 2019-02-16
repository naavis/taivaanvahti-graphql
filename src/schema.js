const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  observation(id: ID!): Observation
  observationsBy(observer: String!): [Observation]
}

type Observation {
  id: ID!
  title: String!
  description: String
  observers: [String!]!
  type: ObservationType!
  comments: [Comment]
}

type Comment {
  id: ID!
  user: String!
  time: String!
  text: String!
}

enum ObservationType {
  DEEP_SKY
  SOLAR_SYSTEM
  ECLIPSE
  FIREBALL
  AURORA
  RARE_CLOUDS
  STORM
  HALO
  OTHER
}
`;

module.exports = typeDefs;
