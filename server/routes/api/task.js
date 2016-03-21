'use strict';

var express = require('express'),
    router  = express.Router();

var allowCors = require('../../middleware/allowCors');

var createTask  = require('../../controllers/api/task/createTask'),
    updateTask  = require('../../controllers/api/task/updateTask'),
    getTasks    = require('../../controllers/api/task/getTasks'),
    getTaskById = require('../../controllers/api/task/getTaskById'),
    deleteTask  = require('../../controllers/api/task/deleteTask');

// https://osmosy.com/api/v1/task
router.post('/', allowCors, createTask);

// https://osmosy.com/api/v1/task/123
router.put('/:id', allowCors, updateTask);

// https://osmosy.com/api/v1/task/userId/123
router.delete('/:id/:id', allowCors, deleteTask);

// https://osmosy.com/api/v1/task/id/3
router.get('/id/:id', allowCors, getTaskById);

// https://osmosy.com/api/v1/tasks
router.get('/', allowCors, getTasks);

module.exports = router;
