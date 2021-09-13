const { Schema } = require('mongoose');
const mongoose = require('mongoose')

const schema = mongoose.Schema;
const taskSchema = new Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('tasks',taskSchema)

