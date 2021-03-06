const mongoose = require("mongoose");

const {Schema} = mongoose;

//Schema of the exhibtion collection
const ExhibitionSchema = new Schema({
    title: String,
    slogan: String,
    largePreview: String,
    smallPreview: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    totalRegistered: Number,
    roomLocation: String,
    seatsAvailable: Number
});

const Exhibition = mongoose.model("exhibition", ExhibitionSchema);

module.exports = Exhibition;
