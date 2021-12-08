const mongoose = require("mongoose");

const {Schema} = mongoose;
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    profile: String,
    email: String,
    password: String,
    memberShip: String,
    credits: Number,
    dateOfBirth: Date
});

const User = mongoose.model("user",UserSchema);
module.exports = User;

