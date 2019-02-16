module.exports = {
  Query: {
    observation:
      async (_, { id }, { dataSources }) => dataSources.observations.getObservation(id),
    observationsBy:
      async (_, { observer }, { dataSources }) => dataSources.observations.getObservationsBy(observer),
  },
  Observation: {
    comments: (obj, _, { dataSources }) => dataSources.comments.getCommentsForObservation(obj.id),
  },
};
