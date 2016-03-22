'use strict';

var R      = require('ramda'),
    config = require('config');

var VALIDATION_ERROR_KEY_ILLEGAL_PARAM                   = 'VALUE',
    VALIDATION_ERROR_KEY_MISSING_PARAM                   = 'REQUIRED',
    VALIDATION_ERROR_KEY_UNSUPPORTED_PARAM               = 'UNSUPPORTED',
    MAX_CONTROLLERS_TO_WHICH_EVENT_EMITTER_SHOULD_LISTEN = 100;

var COMMON_TIMESTAMP    = new Date('2016-02-01T17:23:30.000Z'),
    USER_PRIVATE_FIELDS = R.path(['api', 'USER_PRIVATE_FIELDS'], config);

var KNOWN_TEST_TASKS = [
  {
    "id"      : 10,
    "date"    : "2016-03-21T22:56:11+00:00",
    "checked" : false,
    "text"    : "Sleep"
  },
  {
    "id"      : 9,
    "date"    : "2016-03-21T22:55:57+00:00",
    "checked" : false,
    "text"    : "Stretch"
  },
  {
    "id"      : 8,
    "date"    : "2016-03-21T22:53:14+00:00",
    "checked" : false,
    "text"    : "Workout"
  },
  {
    "id"      : 2,
    "date"    : "2016-03-21T17:22:05+00:00",
    "text"    : "Shred some guitar",
    "checked" : false
  },
  {
    "id"      : 5,
    "date"    : "2016-03-21T17:21:04+00:00",
    "text"    : "Run to the hills",
    "checked" : true
  },
  {
    "id"      : 4,
    "checked" : false,
    "text"    : "Attend all-hands meeting",
    "date"    : "2016-03-18T09:26:19+00:00"
  },
  {
    "id"      : 1,
    "checked" : false,
    "text"    : "Buy birthday cake for Dad",
    "date"    : "2016-03-12T21:26:33+00:00"
  }
];

var COMMON_REQUEST_BODY = {
  flash   : R.identity,
  session : {
    flash : {}
  }
};

var COMMON_RESPONSE_BODY = {
  locals : {}
};

var validationErr = R.curry(function(errorKey, param) {
  var errorTemplate = R.path(['errors', 'validation', errorKey], config),
      errorMessage  = R.prop('message', errorTemplate) + ': ' + param;

  return R.merge(errorTemplate, {
    message : errorMessage
  });
});

/**
 * Return a new object that matches `originalObj` except with the new
 * key/val assignment provided by the overrides.
 *
 * @param {Object} originalObj The object used as the reference.
 * @param {String} overrideKey The property name we will be overriding.
 * @param {*}      overrideVal The new value
 * @returns {Object}
 */
var override = R.curry(function(originalObj, overrideKey, overrideVal) {
  return R.merge(originalObj, R.objOf(overrideKey, overrideVal, {}));
});

/**
 * Mock a JSON response similar to that from the alien-node-api-utils.
 *
 * @param {Number} statusCode The HTTP status code (200, 404, etc).
 * @param {Object} data       The response object. Most likely a db query response or error message.
 * @returns {Object}
 */
var makeJsonResponse = function(statusCode, data) {

  return R.merge({
    statusCode : statusCode,
    flash      : {
      notice : 'notice',
      error  : 'error'
    }
  }, {
    data : data
  });
};

/**
 * Omit [a] property(s) from a parent and all nested children.
 * @param {Array} omittedPropsArr
 * @param {*} The object or item in the recursion to check for said props.
 * @returns {Array|*}
 */
var recursivelyOmitProps = R.curry(function(omittedPropsArr, v) {
  if (!R.is(Object, v)) {
    return v;
  }
  if (!R.isArrayLike(v)) {
    v = R.omit(omittedPropsArr, v);
  }
  return R.map(recursivelyOmitProps(omittedPropsArr), v);
});

// Fix for redis-mock that is misusing EventEmitter
require('events').EventEmitter.prototype._maxListeners = MAX_CONTROLLERS_TO_WHICH_EVENT_EMITTER_SHOULD_LISTEN;

module.exports = {
  illegalParamErr      : validationErr(VALIDATION_ERROR_KEY_ILLEGAL_PARAM),
  missingParamErr      : validationErr(VALIDATION_ERROR_KEY_MISSING_PARAM),
  unsupportedParamErr  : validationErr(VALIDATION_ERROR_KEY_UNSUPPORTED_PARAM),
  override             : override,
  makeJsonResponse     : makeJsonResponse,
  recursivelyOmitProps : recursivelyOmitProps,
  COMMON_TIMESTAMP     : COMMON_TIMESTAMP,
  COMMON_REQUEST_BODY  : COMMON_REQUEST_BODY,
  COMMON_RESPONSE_BODY : COMMON_RESPONSE_BODY,
  KNOWN_TEST_TASKS     : KNOWN_TEST_TASKS
};
