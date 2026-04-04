/* global WIKI */

exports.up = knex => {
  return knex.schema.table('pages', table => {
    table.boolean('isRatingDisabled').notNullable().defaultTo(false)
  })
}

exports.down = knex => {
  return knex.schema.table('pages', table => {
    table.dropColumn('isRatingDisabled')
  })
}
