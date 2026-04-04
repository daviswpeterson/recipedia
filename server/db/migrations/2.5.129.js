/* global WIKI */

exports.up = knex => {
  return knex.schema
    .createTable('pageRatings', table => {
      table.increments('id').primary()
      table.integer('pageId').unsigned().notNullable().references('id').inTable('pages').onDelete('CASCADE')
      table.integer('userId').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('rating').unsigned().notNullable()
      table.string('createdAt').notNullable()
      table.string('updatedAt').notNullable()

      table.unique(['pageId', 'userId'])
    })
}

exports.down = knex => {
  return knex.schema.dropTable('pageRatings')
}
