'use strict';

module.exports = function(strategyName) {
  return require('./strategies/' + strategyName + '/strategy');
};
