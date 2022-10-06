const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

const limitToUserHook = require('../../hooks/limit-to-user-hook');

const hideIsArchived = require('../../hooks/hide-is-archived');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      setField({
        from: 'params.user.id',
        as: 'params.query.userId'
      }),
    ],
    find: [limitToUserHook(), hideIsArchived()],
    get: [hideIsArchived()],
    create: [limitToUserHook()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
