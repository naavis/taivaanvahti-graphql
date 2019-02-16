module.exports = {
  Query: {
		observation: async (_, { id }, { dataSources }) => 
			dataSources.vahtiAPI.getObservation(id),
		observationsBy: async (_, { observer }, { dataSources }) =>
		  dataSources.vahtiAPI.getObservationsBy(observer),
	},
};