const mongoose = require("mongoose");

const {Schema} = mongoose;

const ExhibitionSchema = new Schema({
    title: String,
    slogan: String,
    thumbNail: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    totalRegistered: Number,
    roomLocation: String
});

const Exhibition = mongoose.model("exhibition", ExhibitionSchema);

module.exports = Exhibition;
