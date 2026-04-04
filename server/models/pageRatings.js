const Model = require('objection').Model

/* global WIKI */

/**
 * Page Ratings model
 */
module.exports = class PageRating extends Model {
  static get tableName() { return 'pageRatings' }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['pageId', 'userId', 'rating'],

      properties: {
        id: {type: 'integer'},
        pageId: {type: 'integer'},
        userId: {type: 'integer'},
        rating: {type: 'integer', minimum: 1, maximum: 5},
        createdAt: {type: 'string'},
        updatedAt: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./users'),
        join: {
          from: 'pageRatings.userId',
          to: 'users.id'
        }
      },
      page: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./pages'),
        join: {
          from: 'pageRatings.pageId',
          to: 'pages.id'
        }
      }
    }
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }
  $beforeInsert() {
    this.createdAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }
}
