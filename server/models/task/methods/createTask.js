'use strict';

var R      = require('ramda'),
    Q      = require('q'),
    config = require('config');

var DB               = require('../../../services/db/DB')('fs'),
    validateTaskData = require('../helpers/validateTaskData').validateForInsert;

/**
 * Create a task record
 * @param {Object} data
 * @throws {Error}
 * @returns {Promise}
 */
var createTask = function(data) {
  validateTaskData(data);
  return Q(data).then(DB.insert('todos'));
};

module.exports = createTask;
