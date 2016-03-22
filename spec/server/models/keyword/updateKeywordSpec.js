'use strict';

var R      = require('ramda'),
    config = require('config');

var updateKeyword  = require('../../../../server/models/keyword/methods/updateKeyword'),
    getKeywordById = require('../../../../server/models/keyword/methods/getKeywordById'),
    commonMocks    = require('../../../_helpers/commonMocks');

var A_POSITIVE_NUMBER    = 1337,
    A_NEGATIVE_NUMBER    = -1337,
    STRING_ONE_CHAR      = 'a',
    STRING_SEVENTY_CHARS = new Array(71).join('*'),
    A_STRING             = 'ABC';

var KNOWN_TEST_ID     = 1,
    KNOWN_TEST_TITLE  = 'indoor plants',
    FAKE_UNKNOWN_ID   = 99,
    FAKE_TITLE        = 'poisonous plants';

describe('updateKeyword', function() {

  it('fails gracefully when given an unknown keyword id to update', function(done) {
    updateKeyword(FAKE_UNKNOWN_ID, {
      title : FAKE_TITLE
    }).then(function(data) {
      expect(R.prop('affectedRows', data)).toBe(0);
      done();
    });
  });

  it('throws an error when given an id of type other than Number', function() {
    expect(function() {
      updateKeyword(A_STRING, {
        title : FAKE_TITLE
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a null id', function() {
    expect(function() {
      updateKeyword(null, {
        title : FAKE_TITLE
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  // TITLE IN BODY
  it('updates an keyword title when given a string of expected length', function(done) {
    updateKeyword(KNOWN_TEST_ID, {
      title : FAKE_TITLE
    }).then(function(data) {
      expect(R.prop('affectedRows', data)).toBe(1);
      getKeywordById(KNOWN_TEST_ID)
        .then(function(keyword) {
          expect(R.prop('title', keyword)).toBe(FAKE_TITLE);
          done();
        });
    });
  });

  it('throws an error when given a title that is too long', function() {
    expect(function() {
      updateKeyword(KNOWN_TEST_ID, {
        title : STRING_SEVENTY_CHARS
      });
    }).toThrow(commonMocks.illegalParamErr('title'));
  });

  it('throws an error when given a title that is too short', function() {
    expect(function() {
      updateKeyword(KNOWN_TEST_ID, {
        title : STRING_ONE_CHAR
      });
    }).toThrow(commonMocks.illegalParamErr('title'));
  });

  it('throws an error when given a title of type other than String', function() {
    expect(function() {
      updateKeyword(KNOWN_TEST_ID, {
        title : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('title'));
  });

  // STATUS
  it('throws an error when given an status value of type other than Number', function() {
    expect(function() {
      updateKeyword(KNOWN_TEST_ID, {
        status : A_STRING
      });
    }).toThrow(commonMocks.illegalParamErr('status'));
  });

  it('throws an error when given an status value that is a negative number', function() {
    expect(function() {
      updateKeyword(KNOWN_TEST_ID, {
        status : A_NEGATIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('status'));
  });

  it('does not update anything when no req body is provided', function(done) {
    updateKeyword(KNOWN_TEST_ID, undefined)
      .then(function(data) {
        getKeywordById(KNOWN_TEST_ID)
          .then(function(keyword) {
            expect(R.prop('id', keyword)).toBe(KNOWN_TEST_ID);
            expect(R.prop('title', keyword)).toBe(KNOWN_TEST_TITLE);
            done();
          });
      });
  });

  it('fails gracefully when given an empty req body', function(done) {
    updateKeyword(KNOWN_TEST_ID, {})
      .then(function(res) {
        expect(res).toBe(false);
        done();
      });
  });
});
