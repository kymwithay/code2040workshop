'use strict';

var R = require('ramda');

var makeTimestamp = require('./makeTimestamp');

var decorateForInsert = function(data, item) {
  return R.compose(
    JSON.stringify,
    R.prepend(R.__, data),
    R.merge({
      id   : R.compose(R.inc, R.length)(data),
      date : makeTimestamp()
    })
  )(item);
};

module.exports = decorateForInsert;
