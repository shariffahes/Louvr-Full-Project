const mongoose = require("mongoose");

const {Schema} = mongoose;
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    credits: Number,
    registeredExhibitions: [mongoose.Types.ObjectId],
    dateOfBirth: Date
});

const User = mongoose.model("user",UserSchema);
module.exports = User;

