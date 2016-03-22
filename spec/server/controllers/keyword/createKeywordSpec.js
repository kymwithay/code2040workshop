'use strict';

var R             = require('ramda'),
    config        = require('config'),
    request       = require('dupertest-patched'),
    createKeyword = require('../../../../server/controllers/api/keyword/createKeyword'),
    commonMocks   = require('../../../_helpers/commonMocks');

var PRE_SEEDED_RECORDS_COUNT = 30,
    FAKE_KEYWORD_DATA        = {
      title  : 'bloodsport wooden carvings',
      status : 1
    },
    FAKE_KEYWORD_DATA_REQUIRED   = R.omit(['status'], FAKE_KEYWORD_DATA),
    FAKE_KEYWORD_DATA_INCOMPLETE = R.omit(['title'],  FAKE_KEYWORD_DATA);

var mergeInsertId = R.merge(R.objOf('id', PRE_SEEDED_RECORDS_COUNT + 1));

describe('keywordCtrl.createKeyword', function() {
  it('returns keyword when creating an keyword with all correct params', function(done) {
    request(createKeyword)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .body(FAKE_KEYWORD_DATA)
      .end(function(res) {
        var responseData = R.prop('data', res);
        expect(commonMocks.recursivelyOmitProps(['timestamp'], responseData))
          .toEqual(mergeInsertId(FAKE_KEYWORD_DATA));
        done();
      });
  });

  it('returns keyword when creating an keyword with required correct params', function(done) {
    request(createKeyword)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .body(FAKE_KEYWORD_DATA_REQUIRED)
      .end(function(res) {
        var responseData = R.prop('data', res);
        expect(commonMocks.recursivelyOmitProps(['timestamp'], responseData))
          .toEqual(mergeInsertId(FAKE_KEYWORD_DATA_REQUIRED));
        done();
      });
  });

  it('throws an error when creating an keyword with incomplete params', function(done) {
    request(createKeyword)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .body(FAKE_KEYWORD_DATA_INCOMPLETE)
      .expect(commonMocks.makeJsonResponse(200, R.objOf('err', commonMocks.missingParamErr('title'))), done);
  });
});
