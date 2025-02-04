const express = require('express');
const { CreateTask, UpdateTask, GetTask, GetTaskById, DeleteTask } = require('./task.controller');
const { isAuthenticated } = require('../libs/libs.middleware');

const TaskRouter = express.Router();

TaskRouter.post('/', [isAuthenticated], CreateTask);
TaskRouter.put('/:id', [isAuthenticated], UpdateTask);
TaskRouter.get('/', [isAuthenticated], GetTask)
TaskRouter.get('/:id', [isAuthenticated], GetTaskById)
TaskRouter.delete('/:id', [isAuthenticated], DeleteTask)

module.exports = {
    TaskRouter
}