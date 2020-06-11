/**
 * @namespace database
 * 
 * @file
 * This file simply creates a database schema for the 
 * database so there is a structure in place for the 
 * webpages to be stored.
 */

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
