const mongoose = require('mongoose')

const { MONGO_URI } = process.env

const MongoDBConnection = () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connection sucessfuly')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })
}

module.exports = {
    MongoDBConnection
}