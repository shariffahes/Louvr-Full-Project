const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Louvre")
    .then(() => {
        console.log("connected to the db.");
    }).catch(err => {
        console.log("error in connecting. ERR: " + err);
    });

const {Schema} = mongoose;

const ExhibitionSchema = new Schema({
    title: String,
    slogan: String,
    thumbNail: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    totalRegistered: Number,
    rommLocation: String
});

const Exhibition = mongoose.model("exhibition", ExhibitionSchema);

module.exports = Exhibition;
