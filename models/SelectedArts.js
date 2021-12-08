const mongoose = require("mongoose");

const {Schema} = mongoose;

const SelectedArtsSchema = new Schema({
    title: String,
    description: String,
    thumbNail: String
});

const SelectedArts = mongoose.model("selected-arts", SelectedArtsSchema);

module.exports = SelectedArts;
