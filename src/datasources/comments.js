const { RESTDataSource } = require('apollo-datasource-rest');

const commentReducer = comment => ({
  id: comment.id,
  user: comment.user,
  time: comment.start,
  text: comment.text,
});

class CommentAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.taivaanvahti.fi/app/api/';
  }

  async getCommentsForObservation(id) {
    try {
      const response = await this.get('comment_search.php', { format: 'json', observation: id });
      return response.comment.map(c => commentReducer(c));
    } catch (e) {
      return [];
    }
  }
}

module.exports = CommentAPI;
