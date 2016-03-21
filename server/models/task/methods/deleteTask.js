'use strict';

var config = require('config');

var DB               = require('../../../services/db/DB')('fs'),
    validateTaskData = require('../helpers/validateTaskData').validateForDelete;

/**
 * Delete a task record
 * @param {Number} id
 * @throws {Error}
 * @returns {Promise}
 */
var deleteTask = function(id) {
  var data = {id : id};
  validateTaskData(data);
  return DB.remove('todos', 'id', id);
};

module.exports = deleteTask;
