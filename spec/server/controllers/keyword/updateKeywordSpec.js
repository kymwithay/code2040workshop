'use strict';

var R             = require('ramda'),
    config        = require('config'),
    request       = require('dupertest-patched'),
    commonMocks   = require('../../../_helpers/commonMocks'),
    updateKeyword = require('../../../../server/controllers/api/keyword/updateKeyword');

var KNOWN_TEST_KEYWORD_DATA = {
      id     : 1,
      title  : 'indoor plants',
      status : 1
    },
    FAKE_KEYWORD_UPDATE_DATA = {
      title : 'indoor greens'
    },
    FAKE_PARAMS_WITH_UNKNOWN_ID = {
      id : 99
    },
    FAKE_PARAMS_WITH_KNOWN_TEST_ID = {
      id : 1
    };

var updatedKeywordData = R.merge(KNOWN_TEST_KEYWORD_DATA, FAKE_KEYWORD_UPDATE_DATA),
    timestampLens      = R.lensPath(['timestamp']);

describe('keywordCtrl.updateKeyword', function() {
  it('updates a keyword when provided an id and new properties to update', function(done) {
    request(updateKeyword)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(FAKE_PARAMS_WITH_KNOWN_TEST_ID)
      .body(FAKE_KEYWORD_UPDATE_DATA)
      .end(function(res) {
        var responseData = R.prop('data', res);
        expect(responseData)
          .toEqual(R.set(timestampLens, R.view(timestampLens, responseData), updatedKeywordData));
        done();
      });
  });

  it('throws an error when updating a keyword that does not exist', function(done) {
    request(updateKeyword)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(FAKE_PARAMS_WITH_UNKNOWN_ID)
      .body(FAKE_KEYWORD_UPDATE_DATA)
      .expect(commonMocks.makeJsonResponse(200, R.objOf('err', commonMocks.noResultsErr)), done);
  });

  it('throws an error when updating a keyword without an id', function(done) {
    request(updateKeyword)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params(undefined)
      .body(FAKE_KEYWORD_UPDATE_DATA)
      .expect(commonMocks.makeJsonResponse(200, R.objOf('err', commonMocks.missingParamErr('id'))), done);
  });
});
