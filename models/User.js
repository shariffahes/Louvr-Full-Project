const mongoose = require("mongoose");

const {Schema} = mongoose;
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    credits: { type: Number, default: 700},
    registeredExhibitions:{type: [mongoose.Types.ObjectId], default: []},
    dateOfBirth: Date
});

const User = mongoose.model("user",UserSchema);
module.exports = User;

