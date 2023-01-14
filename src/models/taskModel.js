const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Todo", "InProgress", "Completed"],
        default: "Todo",
    },
    CreateDate: {
        type: Date,
        default: Date.now,
    },
    userAssign: {
        type: ObjectId,
        ref: "User",
        required: true,
    },

}, { timestamps: true })


module.exports = mongoose.model('task', taskSchema)