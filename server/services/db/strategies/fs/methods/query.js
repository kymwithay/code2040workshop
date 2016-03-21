'use strict';

var R            = require('ramda'),
    Q            = require('q'),
    fs           = require('fs'),
    promiseUtils = require('alien-node-q-utils');

var parseList = require('../helpers/parseList');

var filterByCriteriaAndSort = function(list, criteria) {
  // TODO add filter
  return R.compose(R.sortBy(R.compose(R.prop('id'))), R.clone)(list);
};

var query = R.curry(function(collection, criteria) {
  var deferred = Q.defer();

  fs.readFile(collection + '.json', function(err, list) {
    return promiseUtils.rejectOnErrorOrResolve(deferred, err, filterByCriteriaAndSort(parseList(list), criteria));
  });

  return deferred.promise;
});

module.exports = query;
