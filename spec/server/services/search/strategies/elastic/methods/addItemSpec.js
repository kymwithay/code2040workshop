'use strict';

var R = require('ramda');

var addItem = require('../../../../../../../server/services/search/strategies/elastic/methods/addItem');

var FAKE_INDEX = 'bar',
    FAKE_TYPE  = 'baz',
    FAKE_ID    = 123,
    FAKE_ITEM  = {
      id : FAKE_ID,
      a  : 'b'
    };

describe('elastic.addItem', function() {
  it('adds an index action item to the elastic queue in redis', function(done) {
    addItem(FAKE_INDEX, FAKE_TYPE, FAKE_ITEM)
      .then(function(res) {
        expect(res).toEqual(FAKE_ITEM);
        done();
      })
  });
});
