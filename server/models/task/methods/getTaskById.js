'use strict';

var config = require('config');

var DB               = require('../../../services/db/DB')('fs'),
    validateTaskData = require('../helpers/validateTaskData').validateForGetById;

/**
 * Look up a task by id
 * @param {Number} id
 * @throws {Error}
 * @returns {Promise}
 */
var getTaskById = function(id) {
  validateTaskData({id : id});
  return DB.lookup('todos', 'id', id);
};

module.exports = getTaskById;
