const mongoose = require('mongoose')

const Schema = mongoose.Schema

const teamSchema = new Schema({
    game: {
        type: String,
        required: true
    },
    challenge: {
        type: String,
        required: true
    },
    members: {
        type: [String],
        required: true,
        default: undefined
    },
    createdBy: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Team', teamSchema)