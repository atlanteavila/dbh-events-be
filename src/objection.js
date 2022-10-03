const { Model } = require('objection');
const knex = require('knex');

module.exports = function (app) {
  const { client, connection } = app.get('postgres');
  connection.ssl = { rejectUnauthorized: false };
  const db = knex({ client, connection, useNullAsDefault: false });
  console.log('db', db)
  console.log('db', connection)
  Model.knex(db);

  app.set('knex', db);
};
