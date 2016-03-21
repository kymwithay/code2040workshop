'use strict';

var R            = require('ramda'),
    Q            = require('q'),
    config       = require('config'),
    apiUtils     = require('alien-node-api-utils'),
    log          = require('../../../utils/log');

var maybeParseIntFromPath = require('../../_helpers/maybeParseIntFromPath'),
    Task                  = require('../../../models/task/Task');

/**
 * Update an task record
 * @param {Object} req
 * @param {Object} res
 */
var updateTask = function(req, res) {
  var taskData = R.prop('body', req),
      taskId   = maybeParseIntFromPath(['params', 'id'], req);

  return Q(taskData)
    .then(Task.updateTask(taskId))
    .then(Task.getTaskById.bind(null, taskId))
    .then(apiUtils.jsonResponseSuccess(req, res))
    .catch(function(err) {
      log.error('Promise rejected in updateTask controller: ', err);
      return apiUtils.jsonResponseError(req, res, config.errors.decorateForJson(err));
    });
};

module.exports = updateTask;
