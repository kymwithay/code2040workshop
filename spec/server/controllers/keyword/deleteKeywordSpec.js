'use strict';

var R             = require('ramda'),
    config        = require('config'),
    request       = require('dupertest-patched'),
    commonMocks   = require('../../../_helpers/commonMocks'),
    deleteKeyword = require('../../../../server/controllers/api/keyword/deleteKeyword');

var FAKE_PARAMS_WITH_KNOWN_TEST_KEYWORD_ID = {
      id : 1
    },
    FAKE_PARAMS_WITH_UNKNOWN_KEYWORD_ID = {
      id : 99
    },
    FAKE_PARAMS_WITH_MALFORMED_KEYWORD_ID = {
      id : 'foo'
    };

describe('keywordCtrl.deleteKeyword', function() {
  it('successfully deletes a keyword', function(done) {
    request(deleteKeyword)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(FAKE_PARAMS_WITH_KNOWN_TEST_KEYWORD_ID)
      .expect(commonMocks.makeJsonResponse(200, commonMocks.COMMON_DB_UPDATE_OR_DELETE_RESPONSE), done);
  });

  it('fails gracefully when attempting to delete a keyword that is not in the database', function(done) {
    request(deleteKeyword)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(FAKE_PARAMS_WITH_UNKNOWN_KEYWORD_ID)
      .expect(commonMocks.makeJsonResponse(200, R.objOf('err', commonMocks.noResultsErr)), done);
  });

  it('throws an error when given a malformed id', function(done) {
    request(deleteKeyword)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(FAKE_PARAMS_WITH_MALFORMED_KEYWORD_ID)
      .expect(commonMocks.makeJsonResponse(200, R.objOf('err', commonMocks.illegalParamErr('id'))), done);
  });

  it('throws an error when given null params', function(done) {
    request(deleteKeyword)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(null)
      .expect(commonMocks.makeJsonResponse(200, R.objOf('err', commonMocks.missingParamErr('id'))), done);
  });
});
