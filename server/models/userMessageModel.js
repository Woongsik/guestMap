const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    name: String,
    message: String, 
    lng: Number,
    lat: Number,
    date: Date 
});

module.exports = mongoose.model("userInfo", Schema);