'use strict';

var R          = require('ramda'),
    Q          = require('q'),
    config     = require('config'),
    apiUtils   = require('alien-node-api-utils'),
    log        = require('../../../utils/log');

var _createTask = require('../../../models/task/methods/createTask');

var decorateForModel = function(body) {
  var _body = R.clone(body);
  _body.checked = JSON.parse(_body.checked);
  return _body;
};

/**
 * Create a new task record
 * @param {Object} req
 * @param {Object} res
 */
var createTask = function(req, res) {
  var taskData = R.compose(decorateForModel, R.prop('body'))(req);

  return Q(taskData)
    .then(_createTask)
    .then(apiUtils.jsonResponseSuccess(req, res))
    .catch(function(err) {
      log.error('Promise rejected in createTask controller: ', err);
      return apiUtils.jsonResponseError(req, res, config.errors.decorateForJson(err));
    });
};

module.exports = createTask;
