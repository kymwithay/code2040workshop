'use strict';

var R          = require('ramda'),
    Q          = require('q'),
    config     = require('config'),
    apiUtils   = require('alien-node-api-utils'),
    log        = require('../../../utils/log');

var Task                  = require('../../../models/task/Task'),
    maybeParseIntFromPath = require('../../_helpers/maybeParseIntFromPath');

/**
 * Delete an task record
 * @param {Object} req
 * @param {Object} res
 */
var deleteTask = function(req, res) {
  var taskId = maybeParseIntFromPath(['params', 'id'], req);

  console.log('here..', taskId);

  return Q(taskId)
    .then(Task.deleteTask)
    .then(apiUtils.jsonResponseSuccess(req, res))
    .catch(function(err) {
      log.error('Promise rejected in deleteTask controller: ', err);
      return apiUtils.jsonResponseError(req, res, config.errors.decorateForJson(err));
    });
};

module.exports = deleteTask;
