'use strict';

var R = require('ramda');

var search = require('../../../../../../../server/services/search/strategies/elastic/methods/search');

var mockSearchClient = {
  search : R.T
};

var FAKE_QUERY = 'foo',
    FAKE_INDEX = '_all',
    FAKE_SIZE  = 10,
    FAKE_FROM  = 0;

describe('elastic.search', function() {

  beforeEach(function() {
    spyOn(mockSearchClient, 'search');
  });

  it('searches without error', function(done) {
    search(mockSearchClient, FAKE_INDEX, FAKE_SIZE, FAKE_FROM, FAKE_QUERY)
      .then(function(res) {
        expect(R.has('hits', res)).toBe(true);
        done();
      })
  });
});
