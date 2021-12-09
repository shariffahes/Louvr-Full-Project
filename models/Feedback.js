const mongoose = require("mongoose");

const {Schema} = mongoose;
const Feedback = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phonenum: String,
    description: String
});

const Feedback = mongoose.model("user",Feedback);
module.exports = Feedback;

