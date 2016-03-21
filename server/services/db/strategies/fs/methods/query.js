'use strict';

var R            = require('ramda'),
    Q            = require('q'),
    fs           = require('fs'),
    promiseUtils = require('alien-node-q-utils');

var toJson = require('../helpers/toJson');

var query = R.curry(function(collection, criteria) {
  var deferred = Q.defer();

  deferred.resolve([]);
  //fs.readFile(collection + '.json', function(err, list) {
  //  return promiseUtils.rejectOnErrorOrResolve(deferred, err, R.find(R.propEq(k, v), toJson(list)));
  //});

  return deferred.promise;
});

module.exports = query;
