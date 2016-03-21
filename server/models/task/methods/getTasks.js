'use strict';

var config = require('config');

var DB = require('../../../services/db/DB')('fs');

/**
 * Fetch tasks
 * @throws {Error}
 * @returns {Promise}
 */
var getTasks = function() {
  return DB.query('todos', undefined);
};

module.exports = getTasks;
