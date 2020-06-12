const mongoose = require("mongoose");
//create database skeleton
const dataSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true },
    created: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model("data", dataSchema);
