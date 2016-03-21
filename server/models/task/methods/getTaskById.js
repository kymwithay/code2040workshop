'use strict';

var R      = require('ramda'),
    Q      = require('q'),
    config = require('config');

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
  return Q(data).then(DB.lookup('id', id));
};

module.exports = getTaskById;
