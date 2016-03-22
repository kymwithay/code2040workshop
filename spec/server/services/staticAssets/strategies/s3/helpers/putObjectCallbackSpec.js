'use strict';

var R  = require('ramda'),
    Q  = require('q'),
    fs = require('fs');

var putObjectCallback = require('../../../../../../../server/services/staticAssets/strategies/s3/helpers/putObjectCallback'),
    unlinkCallback    = require('../../../../../../../server/services/staticAssets/strategies/s3/helpers/unlinkCallback');

var FAKE_FILE = {
      name : 'foo.jpg',
      path : '/tmp/foo'
    },
    FAKE_ERR  = 'some error';

var fakeFs = {
      unlink : function(path, callback) {
        callback();
      }
    },
    fakeFsError = {
      unlink : function(path, callback) {
        callback(FAKE_ERR);
      }
    };

describe('staticAssets.s3.putObjectCallback', function() {
  it('resolves a promise when no error is given', function(done) {
    var deferred = Q.defer();

    putObjectCallback(deferred, fakeFs, unlinkCallback, FAKE_FILE.name, FAKE_FILE)();

    deferred.promise.then(function(resolved) {
      expect(resolved).toBe(FAKE_FILE.name);
      done();
    });

  });

  it('rejects a promise when error is given', function(done) {
    var deferred = Q.defer();

    putObjectCallback(deferred, fakeFsError, unlinkCallback, FAKE_FILE.name, FAKE_FILE)();

    deferred.promise.catch(function(rejected) {
      expect(rejected).toBe(FAKE_ERR);
      done();
    });

  });
});
