'use strict';

var R        = require('ramda'),
    prr      = require('prettycats'),
    V        = require('o-validator'),
    validate = require('../../../utils/validatePayload')('taskData');

var validateForInsert = validate({
  title   : V.required(R.both(prr.isStringOfLengthAtLeast(3), prr.isStringOfLengthAtMost(100))),
  checked : V.required(R.is(Boolean))
});

var validateForGetById = validate({
  id : V.required(prr.isPositiveNumber)
});

var validateForUpdate = validate({
  title   : R.both(prr.isStringOfLengthAtLeast(3), prr.isStringOfLengthAtMost(30)),
  checked : R.is(Boolean)
});

var validateForDelete = validate({
  id : V.required(prr.isPositiveNumber)
});

module.exports = {
  validateForInsert  : validateForInsert,
  validateForGetById : validateForGetById,
  validateForUpdate  : validateForUpdate,
  validateForDelete  : validateForDelete
};
