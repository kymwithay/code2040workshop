'use strict';

var R           = require('ramda'),
    config      = require('config'),
    commonMocks = require('../../../_helpers/commonMocks'),
    request     = require('dupertest-patched'),
    getKeywords = require('../../../../server/controllers/api/keyword/getKeywords');

var KNOWN_KEYWORDS = [
  // Plants
  {id : 1,  title : 'indoor plants', status : 1},
  {id : 2,  title : 'outdoor plants', status : 1},
  {id : 3,  title : 'trees', status : 1},
  {id : 4,  title : 'shrubs', status : 1},
  {id : 5,  title : 'grass', status : 1},
  {id : 6,  title : 'cacti', status : 1},
  {id : 7,  title : 'gardens', status : 1},
  {id : 8,  title : 'vines', status : 1},
  {id : 9,  title : 'flowers', status : 1},
  {id : 10, title : 'bushes', status : 1},

  // Waters
  {id : 11, title : 'pools', status : 1},
  {id : 12, title : 'ponds', status : 1},
  {id : 13, title : 'fountains', status : 1},
  {id : 14, title : 'irrigation', status : 1},
  {id : 15, title : 'wells', status : 1},

  // Hardscapes
  {id : 16, title : 'pathways', status : 1},
  {id : 17, title : 'walls', status : 1},
  {id : 18, title : 'retaining walls', status : 1},
  {id : 19, title : 'statues', status : 1},
  {id : 20, title : 'fire pits', status : 1},

  // Play
  {id : 21, title : 'climbing structures', status : 1},
  {id : 22, title : 'tree houses', status : 1},
  {id : 23, title : 'hammocks', status : 1},
  {id : 24, title : 'swing sets', status : 1},
  {id : 25, title : 'play structures', status : 1},

  // Décor
  {id : 26, title : 'metal decor', status : 1},
  {id : 27, title : 'stone decor', status : 1},
  {id : 28, title : 'glass decor', status : 1},
  {id : 29, title : 'wood decor', status : 1},
  {id : 30, title : 'natural decor', status : 1}
];

var sortByTitleAsc = R.sortBy(R.compose(R.toLower, R.prop('title')));

describe('keywordCtrl.getKeywords', function() {
  it('returns keywordData', function(done) {
    request(getKeywords)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .params()
      .end(function(res) {
        var responseData = R.prop('data', res);
        expect(commonMocks.recursivelyOmitProps(['timestamp'], responseData))
          .toEqual(sortByTitleAsc(KNOWN_KEYWORDS));
        done();
      })
  });
});
