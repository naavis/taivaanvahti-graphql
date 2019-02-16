const { RESTDataSource } = require('apollo-datasource-rest');

class VahtiAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.taivaanvahti.fi/app/api/'
  }
  
  async getObservation(id) {
    const response = await this.get('search.php', { format: 'json', id: id });
    const obsResponse = response['observation'][0];
    return this.observationReducer(obsResponse);
  }

  async getObservationsBy(observerName) {
    const response = await this.get('search.php', { format: 'json', user: observerName });
    const observations = response['observation'];
    return observations.map(obs => this.observationReducer(obs));
  }

  observationReducer(observation) {
    return {
      id: observation.id,
      title: observation.title,
      description: observation.description,
      observers: observation.user,
      type: categoryToType(observation.category)
    }
  }
};

const categoryToType = (category) => {
  const mappings = {
    'Aurinkokunta': 'SOLAR_SYSTEM',
    'Syvä taivas': 'DEEP_SKY',
    'Pimennys': 'ECLIPSE',
    'Tulipallo': 'FIREBALL',
    'Revontulet': 'AURORA',
    'Harvinaiset pilvityypit': 'RARE_CLOUDS',
    'Myrskyilmiö': 'STORM',
    'Haloilmiö': 'HALO',
    'Muu ilmiö': 'OTHER'
  };

  return mappings[category] || 'OTHER';
}

module.exports = VahtiAPI;