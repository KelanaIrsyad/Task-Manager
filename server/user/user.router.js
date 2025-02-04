const express = require('express');
const { CreateUser, LoginUser } = require('./user.controller');

const UserRouter = express.Router();

UserRouter.post('/register', CreateUser);
UserRouter.post('/login', LoginUser);

module.exports = {
    UserRouter
}