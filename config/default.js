'use strict';

var R          = require('ramda'),
    winston    = require('winston'),
    logUtils   = require('alien-node-winston-utils');

// These values can be overridden by either environment vars or by a NODE_ENV named config
// which declares the desired object of the same name.
var FALLBACK_DEFAULT_VALUES = {
  host          : 'localhost',
  sessionSecret : 'secret',
  nodePorts     : '3000,3001,3002'
};

var config = {

  server : {
    host      : R.defaultTo(
      R.prop('host', FALLBACK_DEFAULT_VALUES),
      R.path(['env', 'HOST'], process)
    ),
    nodePorts : R.compose(
      R.map(R.multiply(1)),
      R.split(','),
      R.concat(''))(R.defaultTo(
      R.prop('nodePorts', FALLBACK_DEFAULT_VALUES),
      R.path(['env', 'NODE_PORTS'], process)
    ))
  },

  session : {
    secret : R.defaultTo(
      FALLBACK_DEFAULT_VALUES.sessionSecret,
      R.path(['env', 'SESSION_SECRET'], process)
    )
  },

  logging : {
    winston : {
      transports : [
        {
          name          : 'console',
          level         : 'debug',
          timestamp     : logUtils.getDateString,
          colorize      : true,
          transportType : 'console'
        }
      ],
      strategies : {
        console : winston.transports.Console
      }
    }
  },

  errors : {
    UNAUTHORIZED_API_ACCESS : 5000,
    FLAGGED_ITEM            : 5001,

    decorateForJson : function(err) {
      var errCode    = R.prop('code', err),
          statusCode = R.path(['errors', 'errorCodeToHttpStatusCodeMap', errCode], config);

      return {
        err        : err,
        statusCode : R.defaultTo(501, statusCode)
      };
    },

    errorCodeToHttpStatusCodeMap : {
      5000 : 401,
      5001 : 200,
      6000 : 200,
      6001 : 501,
      6002 : 501,
      6999 : 501,
      7000 : 200,
      7001 : 200,
      7002 : 200,
      8000 : 415,
      8001 : 413
    },

    validation : {
      REQUIRED    : {
        code    : 7000,
        message : 'Missing required property'
      },
      UNSUPPORTED : {
        code    : 7001,
        message : 'Unsupported property'
      },
      VALUE       : {
        code    : 7002,
        message : 'Illegal value for property'
      }
    }
  },

  api : {
    COMMON_PRIVATE_FIELDS : [],
    USER_PRIVATE_FIELDS   : [
      'password',
      'email'
    ],
    COMMON_SQL_RETURNABLE_PROPERTIES : [
      'affectedRows',
      'warningCount',
      'message',
      'changedRows'
    ]
  }
};

module.exports = config;

console.log('USING DEFAULT CONFIG');

