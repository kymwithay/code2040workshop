'use strict';

var R              = require('ramda'),
    config         = require('config'),
    commonMocks    = require('../../../_helpers/commonMocks'),
    request        = require('dupertest-patched'),
    getKeywordById = require('../../../../server/controllers/api/keyword/getKeywordById');

var FAKE_PARAMS_WITH_KNOWN_TEST_KEYWORD_ID = {
      id : 1
    },
    FAKE_PARAMS_WITH_UNKNOWN_KEYWORD_ID = {
      id : 99
    },
    KNOWN_TEST_KEYWORD_DATA = {
      id     : 1,
      title  : 'indoor plants',
      status : 1
    };

describe('keywordCtrl.getKeywordById', function() {
  it('returns keywordData when looking for a keyword by id', function(done) {
    request(getKeywordById)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(FAKE_PARAMS_WITH_KNOWN_TEST_KEYWORD_ID)
      .end(function(res) {
        var responseData = R.prop('data', res);
        expect(commonMocks.recursivelyOmitProps(['timestamp'], responseData))
          .toEqual(KNOWN_TEST_KEYWORD_DATA);
        done();
      });
  });

  it('throws an error when looking for a keyword that does not exist', function(done) {
    request(getKeywordById)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(FAKE_PARAMS_WITH_UNKNOWN_KEYWORD_ID)
      .expect(commonMocks.makeJsonResponse(200, R.objOf('err', commonMocks.noResultsErr)), done);
  });

  it('throws an error when given undefined params', function(done) {
    request(getKeywordById)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(undefined)
      .expect(commonMocks.makeJsonResponse(200, R.objOf('err', commonMocks.missingParamErr('id'))), done);
  });

  it('throws an error when given null params', function(done) {
    request(getKeywordById)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(null)
      .expect(commonMocks.makeJsonResponse(200, R.objOf('err', commonMocks.missingParamErr('id'))), done);
  });
});
