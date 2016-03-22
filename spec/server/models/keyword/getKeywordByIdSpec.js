'use strict';

var R      = require('ramda'),
    config = require('config');

var getKeywordById = require('../../../../server/models/keyword/methods/getKeywordById'),
    commonMocks    = require('../../../_helpers/commonMocks');

var KNOWN_TEST_ID   = 1,
    FAKE_UNKNOWN_ID = 99,
    A_STRING        = 'foo';

describe('getKeywordById', function() {

  it('gets a keyword when given a known id', function(done) {
    getKeywordById(KNOWN_TEST_ID).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      done();
    });
  });

  it('throws an error when given an unknown id', function(done) {
    getKeywordById(FAKE_UNKNOWN_ID)
      .catch(function(err) {
        expect(err).toEqual(commonMocks.noResultsErr);
        done();
      })
  });

  it('throws an error when given an id of type other than Number', function() {
    expect(function() {
      getKeywordById(A_STRING);
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when id is missing', function() {
    expect(function() {
      getKeywordById();
    }).toThrow(commonMocks.missingParamErr('id'));
  });

  it('throws an error when given a null id', function() {
    expect(function() {
      getKeywordById(null);
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

});
