'use strict';

var R            = require('ramda'),
    Q            = require('q'),
    fs           = require('fs'),
    promiseUtils = require('alien-node-q-utils');

var toJson            = require('../helpers/toJson'),
    decorateForInsert = require('../helpers/decorateForInsert');

var maybeResolveWithList = R.curry(function(deferred, writeData, err) {
  return promiseUtils.rejectOnErrorOrResolve(deferred, err, JSON.parse(writeData));
});

var insert = R.curry(function(collection, item) {
  var deferred = Q.defer(),
      fileName = collection + '.json',
      writeData;

  fs.readFile(fileName, function(err, list) {
    if (err) {
      deferred.reject(err);
    }
    writeData = decorateForInsert(toJson(list), item);
    fs.writeFile(fileName, writeData, maybeResolveWithList(deferred, writeData));
  });

  return deferred.promise;
});

module.exports = insert;
