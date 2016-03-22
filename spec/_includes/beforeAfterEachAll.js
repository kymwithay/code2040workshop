'use strict';

var fs = require('fs');

var resetAndSeedTables = require(__dirname + '/../_helpers/db/resetAndSeedTables');

beforeAll(function(done) {
  fs.truncate(__dirname + '/../support/logs/log.log', 0, function() {
    done();
  });
});

beforeEach(function(done) {

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

  require.cache = {};

  resetAndSeedTables('applicationDb')
    .then(function(con) {
      con.end();
      done();
    });
});

