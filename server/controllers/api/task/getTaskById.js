'use strict';

var R          = require('ramda'),
    Q          = require('q'),
    config     = require('config'),
    apiUtils   = require('alien-node-api-utils'),
    log        = require('../../../utils/log');

var _getTaskById       = require('../../../models/task/methods/getTaskById'),
    maybeParseIntFromPath = require('../../_helpers/maybeParseIntFromPath');

/**
 * Get a task by id from the database
 * @param {Object} req
 * @param {Object} res
 */
var getTaskById = function(req, res) {
  var taskId = maybeParseIntFromPath(['params', 'id'], req);

  return Q(taskId)
    .then(_getTaskById)
    .then(apiUtils.jsonResponseSuccess(req, res))
    .catch(function(err) {
      log.error('Promise rejected in getTaskById controller: ', err);
      return apiUtils.jsonResponseError(req, res, config.errors.decorateForJson(err));
    });
};

module.exports = getTaskById;
