'use strict';

var R      = require('ramda'),
    config = require('config');

var getKeywords = require('../../../../server/models/keyword/methods/getKeywords'),
    commonMocks = require('../../../_helpers/commonMocks');

var PRE_SEEDED_RECORDS_COUNT = 30;

describe('getKeywords', function() {

  it('gets all keywords', function(done) {
    getKeywords().then(function(data) {
      expect(R.is(Array, data)).toBe(true);
      expect(R.length(data)).toBe(PRE_SEEDED_RECORDS_COUNT);
      done();
    });
  });

});
