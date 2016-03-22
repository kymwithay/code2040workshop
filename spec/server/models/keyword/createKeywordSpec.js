'use strict';

var R = require('ramda');

var createKeyword = require('../../../../server/models/keyword/methods/createKeyword'),
    commonMocks   = require('../../../_helpers/commonMocks');

var A_POSITIVE_NUMBER    = 1337,
    A_NEGATIVE_NUMBER    = -1337,
    STRING_ONE_CHAR      = 'a',
    STRING_SEVENTY_CHARS = new Array(71).join('*'),
    A_STRING             = 'ABC';

var FAKE_TITLE  = 'Foo',
    FAKE_STATUS = 1;

var makeFakeKeywordData = function(includeOptional) {
  var fakeRequiredKeywordData = {
    title  : FAKE_TITLE
  };

  var fakeOptionalKeywordData = {
    status : FAKE_STATUS
  };

  return includeOptional ? R.merge(fakeOptionalKeywordData, fakeRequiredKeywordData) : fakeRequiredKeywordData;
};

var fullKeywordDataForQuery     = makeFakeKeywordData(true),
    requiredKeywordDataForQuery = makeFakeKeywordData(false);

var fullKeywordDataSwapIn = commonMocks.override(fullKeywordDataForQuery);

describe('createKeyword', function() {

  it('creates a keyword record when given expected data for all fields', function(done) {
    createKeyword(fullKeywordDataForQuery).then(function(data) {
      expect(R.prop('affectedRows', data)).toBe(1);
      done();
    });
  });

  it('creates a keyword record when given expected data for only required fields', function(done) {
    createKeyword(requiredKeywordDataForQuery).then(function(data) {
      expect(R.prop('affectedRows', data)).toBe(1);
      done();
    });
  });

  it('throws an error when given an unsupported parameter', function() {
    expect(function() {
      createKeyword(fullKeywordDataSwapIn('foo', 'bar'));
    }).toThrow(commonMocks.unsupportedParamErr('foo'));
  });

  // TITLE
  it('throws an error when given a title of type other than String', function() {
    expect(function() {
      createKeyword(fullKeywordDataSwapIn('title', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('title'));
  });

  it('throws an error when title is missing', function() {
    expect(function() {
      createKeyword(fullKeywordDataSwapIn('title', undefined));
    }).toThrow(commonMocks.missingParamErr('title'));
  });

  it('throws an error when given a title that is too long', function() {
    expect(function() {
      createKeyword(fullKeywordDataSwapIn('title', STRING_SEVENTY_CHARS));
    }).toThrow(commonMocks.illegalParamErr('title'));
  });

  it('throws an error when given a title that is too short', function() {
    expect(function() {
      createKeyword(fullKeywordDataSwapIn('title', STRING_ONE_CHAR));
    }).toThrow(commonMocks.illegalParamErr('title'));
  });

  // STATUS
  it('throws an error when given a status of type other than Number', function() {
    expect(function() {
      createKeyword(fullKeywordDataSwapIn('status', A_STRING));
    }).toThrow(commonMocks.illegalParamErr('status'));
  });

  it('throws an error when given a status that is a negative number', function() {
    expect(function() {
      createKeyword(fullKeywordDataSwapIn('status', A_NEGATIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('status'));
  });
});
