const express = require('express');
const { MongoDBConnection} = require('./libs/libs.database');
const { ROUTER_BASE_USER, ROUTER_BASE_AUTH } = require('./user/user.config');
const { UserRouter } = require('./user/user.router');
const cors = require('cors');
const { ROUTER_BASE_TASK } = require('./task/task.config');
const { TaskRouter } = require('./task/task.router');


const app = express();

//connect to MongoDb
MongoDBConnection();

//cors
app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
)

//parse json
app.use(express.json())

app.use(ROUTER_BASE_AUTH, UserRouter)
app.use(ROUTER_BASE_TASK, TaskRouter)

module.exports = {
    app
}