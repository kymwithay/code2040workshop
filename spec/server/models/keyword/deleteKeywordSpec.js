'use strict';

var R = require('ramda');

var deleteKeyword = require('../../../../server/models/keyword/methods/deleteKeyword'),
    DB            = require('alien-node-mysql-utils'),
    commonMocks   = require('../../../_helpers/commonMocks');

var KNOWN_TEST_ID   = 1,
    FAKE_UNKNOWN_ID = 99,
    A_STRING        = 'foo';

describe('deleteKeyword', function() {

  it('deletes an keyword record when given a known keyword id', function(done) {
    deleteKeyword(KNOWN_TEST_ID).then(function(data) {
      expect(R.prop('affectedRows', data)).toBe(1);
      done();
    });
  });

  it('fails gracefully when given an unknown keyword id', function(done) {
    deleteKeyword(FAKE_UNKNOWN_ID).then(function(data) {
      expect(R.prop('affectedRows', data)).toBe(0);
      done();
    });
  });

  it('throws an error when id is missing', function() {
    expect(function() {
      deleteKeyword();
    }).toThrow(commonMocks.missingParamErr('id'));
  });

  it('throws an error when given an id of type other than Number', function() {
    expect(function() {
      deleteKeyword(A_STRING);
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

});
