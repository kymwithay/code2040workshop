'use strict';

var R = require('ramda');

var listUtils = require('../../../server/utils/list');

var DROP_IF_GTE_LENGTH      = 5,

    LIST_LONGER             = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    LIST_LONGER_EXPECT      = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],

    LIST_SHORTER            = ['x', 'y', 'z'],
    LIST_SHORTER_EXPECT     = ['x', 'y', 'z'],

    LIST_MIXED_UNSORTED    = ['b', 'd', 'a', 'c'],
    LIST_MIXED_SORTED_ASC  = ['a', 'b', 'c', 'd'],
    LIST_MIXED_SORTED_DESC = ['d', 'c', 'b', 'a'],

    LIST_OF_ITEMS_PRE_FILTERED = ['a', 'b', 'c'],
    LIST_OF_ITEMS_FILTERED     = ['a', 'c'],

    LIST_OF_OBJECTS_PRE_FILTERED = [{ foo : 'bar'}, {baz : 'bat'}, {buz : 'but'}],
    LIST_OF_OBJECTS_FILTERED     = [{ foo : 'bar'}, {buz : 'but'}],

    LIST_DROP_LENGTH        = ['q', 'w', 'e', 'r', 't', 'y'],
    LIST_DROP_LENGTH_EXPECT = ['q', 'w', 'e', 'r', 't'];

describe('maybeDropLastItem', function() {
  it('drops the last item from a list if list length exceeds minimum drop length', function() {
    expect(listUtils.maybeDropLastItem(DROP_IF_GTE_LENGTH, LIST_LONGER)).toEqual(LIST_LONGER_EXPECT);
  });
  it('preserves list if length is less than minimum drop length', function() {
    expect(listUtils.maybeDropLastItem(DROP_IF_GTE_LENGTH, LIST_SHORTER)).toEqual(LIST_SHORTER_EXPECT);
  });
  it('drops the last item from a list if list length is exactly the minimum drop length', function() {
    expect(listUtils.maybeDropLastItem(DROP_IF_GTE_LENGTH, LIST_DROP_LENGTH)).toEqual(LIST_DROP_LENGTH_EXPECT);
  });
});

describe('filterOutObject', function() {
  it('removes an object from a list', function() {
    expect(listUtils.filterOutObject('baz', 'bat', LIST_OF_OBJECTS_PRE_FILTERED)).toEqual(LIST_OF_OBJECTS_FILTERED);
  });
});

describe('filterOutItem', function() {
  it('removes an item from a list', function() {
    expect(listUtils.filterOutItem('b', LIST_OF_ITEMS_PRE_FILTERED)).toEqual(LIST_OF_ITEMS_FILTERED);
  });
});

describe('sortAsc', function() {
  it('sorts a list ascending', function() {
    expect(R.sort(listUtils.sortAsc, LIST_MIXED_UNSORTED)).toEqual(LIST_MIXED_SORTED_ASC);
  });
});

describe('sortDesc', function() {
  it('sorts a list descending', function() {
    expect(R.sort(listUtils.sortDesc, LIST_MIXED_UNSORTED)).toEqual(LIST_MIXED_SORTED_DESC);
  });
});
