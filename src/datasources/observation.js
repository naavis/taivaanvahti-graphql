const { RESTDataSource } = require('apollo-datasource-rest');

const categoryToType = (category) => {
  const mappings = {
    Aurinkokunta: 'SOLAR_SYSTEM',
    'Syvä taivas': 'DEEP_SKY',
    Pimennys: 'ECLIPSE',
    Tulipallo: 'FIREBALL',
    Revontulet: 'AURORA',
    'Harvinaiset pilvityypit': 'RARE_CLOUDS',
    Myrskyilmiö: 'STORM',
    Haloilmiö: 'HALO',
    'Muu ilmiö': 'OTHER',
  };

  return mappings[category] || 'OTHER';
};

const observationReducer = observation => ({
  id: observation.id,
  title: observation.title,
  description: observation.description || '',
  observers: observation.user,
  type: categoryToType(observation.category),
});

class ObservationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.taivaanvahti.fi/app/api/';
  }

  async getObservation(id) {
    const response = await this.get('search.php', { format: 'json', id });
    const observation = response.observation[0];
    return this.observationReducer(observation);
  }

  async getObservationsBy(observerName) {
    const response = await this.get('search.php', { format: 'json', user: observerName });
    const observations = response.observation;
    return observations.map(obs => observationReducer(obs));
  }
}

module.exports = ObservationAPI;
