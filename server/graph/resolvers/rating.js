const _ = require('lodash')
const graphHelper = require('../../helpers/graph')

/* global WIKI */

module.exports = {
  Mutation: {
    async ratings() { return {} }
  },
  RatingMutation: {
    async save(obj, args, context) {
      try {
        if (!context.req.user || context.req.user.id === 2) {
          throw new Error('You must be logged in to rate pages.')
        }

        const rating = parseInt(args.rating)
        if (rating < 1 || rating > 5) {
          throw new Error('Rating must be between 1 and 5.')
        }

        const pageId = parseInt(args.pageId)
        const userId = context.req.user.id

        const existingRating = await WIKI.models.pageRatings.query().where({ pageId, userId }).first()

        if (existingRating) {
          await existingRating.$query().patch({ rating })
        } else {
          await WIKI.models.pageRatings.query().insert({
            pageId,
            userId,
            rating
          })
        }

        const scoreResult = await WIKI.models.knex('pageRatings').where('pageId', pageId).avg({ avgRating: 'rating' }).first()
        const countResult = await WIKI.models.knex('pageRatings').where('pageId', pageId).count({ countRating: 'id' }).first()

        return {
          responseResult: graphHelper.generateSuccess('Rating saved successfully.'),
          ratingScore: scoreResult ? parseFloat(scoreResult.avgRating) || 0 : 0,
          ratingCount: countResult ? parseInt(countResult.countRating) || 0 : 0,
          userRating: rating
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    }
  }
}
