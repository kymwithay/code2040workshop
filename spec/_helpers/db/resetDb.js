'use strict';

var R            = require('ramda'),
    Q            = require('q'),
    fs           = require('fs'),
    config       = require('config'),
    promiseUtils = require('alien-node-q-utils'),
    execsql      = require('execsql');

var commonMocks = require('../commonMocks');

var maybeResolveWithList = R.curry(function(deferred, writeData, err) {
  return promiseUtils.rejectOnErrorOrResolve(deferred, err, JSON.parse(writeData));
});

var resetDb = function(db) {
  var deferred = Q.defer(),
      fileName = db + 'Mock.json',
      writeData;

  fs.readFile(fileName, function(err, list) {
    if (err) {
      deferred.reject(err);
    }

    fs.writeFile(fileName, writeData, maybeResolveWithList(deferred, writeData));
  });

  return deferred.promise;
};

module.exports = resetDb;
