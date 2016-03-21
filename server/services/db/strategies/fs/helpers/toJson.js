'use strict';

var R = require('ramda');

var toJson = R.compose(JSON.parse, R.defaultTo([]));

module.exports = toJson;
