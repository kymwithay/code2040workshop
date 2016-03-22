'use strict';

var R            = require('ramda'),
    Q            = require('q'),
    fs           = require('fs'),
    promiseUtils = require('alien-node-q-utils');

var parseList            = require('../helpers/parseList'),
    decorateForInsert = require('../helpers/decorateForInsert');

var maybeResolveWithList = R.curry(function(deferred, writeData, err) {
  return promiseUtils.rejectOnErrorOrResolve(deferred, err, JSON.parse(writeData));
});

var filterOutObject = R.curry(function(k, v, list) {
  return R.filter(R.compose(R.not, R.identical(v), R.prop(k)), list);
});

var update = R.curry(function(collection, k, v, data) {
  var deferred = Q.defer(),
      fileName = collection + '.json',
      writeData;

  fs.readFile(fileName, function(err, list) {
    var item;

    if (err) {
      deferred.reject(err);
    }

    list = parseList(list);
    item = R.compose(R.merge(R.__, data), R.find(R.propEq(k, v)))(list);
    list = filterOutObject(k, v, list);

    writeData = decorateForInsert(list, item);
    fs.writeFile(fileName, writeData, maybeResolveWithList(deferred, writeData));
  });

  return deferred.promise;
});

module.exports = update;
