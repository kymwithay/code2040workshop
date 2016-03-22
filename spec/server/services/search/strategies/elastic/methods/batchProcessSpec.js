'use strict';

var R = require('ramda');

var batchProcess = require('../../../../../../../server/services/search/strategies/elastic/methods/batchProcess');

var mockSearchClient = {
  bulk : R.T
};

var FAKE_NUM_ITEMS_TO_PROCESS = 5;

xdescribe('elastic.batchProcess', function() {

  beforeEach(function() {
    spyOn(mockSearchClient, 'bulk');
  });

  it('fetches the queue from redis, does some processing, and eventually passes the payload to the elastic bulk api', function(done) {
    batchProcess(mockSearchClient, FAKE_NUM_ITEMS_TO_PROCESS)
      .then(function() {
        expect(mockSearchClient.bulk).toHaveBeenCalledWith(R.objOf('body', []));
        done();
      });
  });
}).pend('batchProcess now has a keys.length condition and we cant mock that out in redistub');
