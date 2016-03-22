'use strict';

var Q = require('q'),
    R = require('ramda');

var FAKE_FILENAME = 'foo.jpg',
    FAKE_ERR      = 'some error';

var unlinkCallback = require('../../../../../../../server/services/staticAssets/strategies/s3/helpers/unlinkCallback');

describe('staticAssets.s3.unlinkCallback', function() {
  it('resolves a promise when no error is given', function(done) {
    var deferred = Q.defer();

    unlinkCallback(deferred, FAKE_FILENAME)();

    deferred.promise.then(function(resolved) {
      expect(resolved).toBe(FAKE_FILENAME);
      done();
    });
  });

  it('rejects a promise when an error is given', function(done) {
    var deferred = Q.defer();

    unlinkCallback(deferred, FAKE_FILENAME)(FAKE_ERR);

    deferred.promise.catch(function(resolved) {
      expect(resolved).toBe(FAKE_ERR);
      done();
    });
  });
});
