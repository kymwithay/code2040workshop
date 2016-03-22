'use strict';

var R = require('ramda');

var deleteItem = require('../../../../../../../server/services/search/strategies/elastic/methods/deleteItem');

var FAKE_INDEX = 'bar',
    FAKE_TYPE  = 'baz',
    FAKE_ID    = 123,
    FAKE_ITEM  = {
      id : FAKE_ID,
      a  : 'b'
    };

describe('elastic.deleteItem', function() {
  it('adds a delete action item to the elastic queue in redis', function(done) {
    deleteItem(FAKE_INDEX, FAKE_TYPE, FAKE_ITEM)
      .then(function(res) {
        expect(res).toEqual(FAKE_ITEM);
        done();
      })
  });
});
