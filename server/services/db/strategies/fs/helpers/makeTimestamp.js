'use strict';

var moment = require('moment');

var makeTimestamp = function() {
  return moment().utc().format();
};

module.exports = makeTimestamp;
