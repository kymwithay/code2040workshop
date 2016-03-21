'use strict';

var R            = require('ramda'),
    Q            = require('q'),
    fs           = require('fs'),
    promiseUtils = require('alien-node-q-utils');

var toJson = require('../helpers/toJson');

var lookup = R.curry(function(collection, k, v) {
  var deferred = Q.defer();

  fs.readFile(collection + '.json', function(err, list) {
    return promiseUtils.rejectOnErrorOrResolve(deferred, err, R.find(R.propEq(k, v), toJson(list)));
  });

  return deferred.promise;
});

module.exports = lookup;
