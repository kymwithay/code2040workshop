'use strict';

var R        = require('ramda'),
    Q        = require('q'),
    config   = require('config'),
    validate = require('../../../utils/validatePayload')('taskId');

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
  return Q(data).then(DB.remove('todos'));
};

module.exports = deleteTask;
