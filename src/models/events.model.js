// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class Events extends Model {

  static get tableName() {
    return 'events';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'title',
        'startDate',
        'endDate',
        'price',
        'locationType',
      ],

      properties: {
        title: { type: 'string' },
        startDate: { type: 'string' },
        endDate: { type: 'string' },
        price: { type: 'integer' },
        locationType: { type: 'string' },
        locationURL: { type: 'string' },
        locationStreetAddress: { type: 'string' },
        locationCity: { type: 'string' },
        locationState: { type: 'string' },
        locationZip: { type: 'string' },
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('events').then(exists => {
    if (!exists) {
      db.schema.createTable('events', table => {
        table.increments('id');
        table.string('title');
        table.dateTime('startDate');
        table.dateTime('endDate');
        table.integer('price');
        table.string('locationType').defaultTo('on location');
        table.string('locationURL');
        table.string('locationStreetAddress');
        table.string('locationCity');
        table.string('locationState');
        table.string('locationZip');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created events table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating events table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating events table', e)); // eslint-disable-line no-console

  return Events;
};
