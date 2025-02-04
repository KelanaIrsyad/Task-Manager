const mongoose = require('mongoose');

const UserObject = {
    username : { type: String, required: true, unique: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true},
    createdAt : { type: Date, default: Date.now },
    updatedAt : { type: Date, default: Date.now },

}

const UserSchema = new mongoose.Schema(UserObject)

const UserModel = new mongoose.model('User', UserSchema)

module.exports = {
    UserModel,
    UserObject,
    UserSchema
}