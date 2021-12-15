const mongoose = require("mongoose");

const {Schema} = mongoose;

//Schema of the exhibtion collection
const FeedbackScheme = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phonenum: String,
    description: String
});

const Feedback = mongoose.model("feedback",FeedbackScheme);
module.exports = Feedback;

