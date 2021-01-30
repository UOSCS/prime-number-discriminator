const mongoose = require("mongoose")

const primeSchema = new mongoose.Schema({
    num: Number,
    outcome: String,
    time: String,
    count: { type: Number, default: 0 }
})

module.exports = mongoose.model("Prime", primeSchema)