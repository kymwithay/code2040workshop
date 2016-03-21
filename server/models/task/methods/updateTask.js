'use strict';

var R        = require('ramda'),
    Q        = require('q'),
    config   = require('config'),
    prr      = require('prettycats'),
    V        = require('o-validator'),
    validate = require('../../../utils/validatePayload')('id');

var DB               = require('../../../services/db/DB')('fs'),
    validateTaskData = require('../helpers/validateTaskData').validateForUpdate;

var validateId = validate({id : V.required(prr.isPositiveNumber)});

/**
 * Update a task record.
 * @param {Number} id
 * @param {Object} data
 * @throws {Error}
 * @returns {Promise}
 */
var updateTask = function(id, data) {

  if (R.either(R.isNil, R.compose(R.identical(JSON.stringify({})), JSON.stringify))(data)) {
    return Q(false);
  }

  validateId({id : id});
  validateTaskData(data);
  return Q(data).then(DB.update('todos', 'id', id));
};

module.exports = R.curry(updateTask);
