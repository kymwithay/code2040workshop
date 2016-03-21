'use strict';

var R = require('ramda');

var parseList = R.compose(JSON.parse, R.defaultTo([]));

module.exports = parseList;
