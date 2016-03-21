'use strict';

var R = require('ramda');

var maybeDropLastItem = R.curry(function(dropIfGte, items) {
  return R.ifElse(R.compose(R.flip(R.gte)(dropIfGte), R.length), R.dropLast(1), R.clone)(items);
});

var filterOutObject = R.curry(function(k, v, items) {
  return R.filter(R.compose(R.not, R.identical(v), R.prop(k)), items);
});

var filterOutItem = R.curry(function(v, items) {
  return R.filter(R.compose(R.not, R.identical(v)), items);
});

var sortAsc = function(a, b) {
  return a < b ? -1 : 1;
};

var sortDesc = function(a, b) {
  return a > b ? -1 : 1;
};

module.exports = {
  maybeDropLastItem : maybeDropLastItem,
  filterOutObject   : filterOutObject,
  filterOutItem     : filterOutItem,
  sortAsc           : sortAsc,
  sortDesc          : sortDesc
};
