const mongoose = require('mongoose')

const TaskObject = {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ["Work", "Personal", "Study"], default: "Work" },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending"},
    dueDate: { type: Date },
    createdAt : { type: Date, default: Date.now },
    updatedAt : { type: Date, default: Date.now },

}

const TaskSchema = new mongoose.Schema(TaskObject)

const TaskModel = new mongoose.model('Task', TaskSchema)

module.exports = {
    TaskModel,
    TaskObject,
    TaskSchema
}