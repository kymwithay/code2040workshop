'use strict';

var R = require('ramda');

var updateItem = require('../../../../../../../server/services/search/strategies/elastic/methods/updateItem');

var FAKE_INDEX = 'bar',
    FAKE_TYPE  = 'baz',
    FAKE_ID    = 123,
    FAKE_ITEM  = {
      id : FAKE_ID,
      a  : 'b'
    };

describe('elastic.updateItem', function() {
  it('adds an update action item to the elastic queue in redis', function(done) {
    updateItem(FAKE_INDEX, FAKE_TYPE, FAKE_ITEM)
      .then(function(res) {
        expect(res).toEqual(FAKE_ITEM);
        done();
      })
  });
});
