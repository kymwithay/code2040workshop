'use strict';

var R          = require('ramda'),
    Q          = require('q'),
    config     = require('config'),
    apiUtils   = require('alien-node-api-utils'),
    log        = require('../../../utils/log');

var _getTasks = require('../../../models/task/methods/getTasks');

/**
 * Fetch tasks from the database
 * @param {Object} req
 * @param {Object} res
 */
var getTasks = function(req, res) {
  return _getTasks()
    .then(apiUtils.jsonResponseSuccess(req, res));
};

module.exports = getTasks;
