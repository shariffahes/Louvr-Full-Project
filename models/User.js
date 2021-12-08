const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Louvre")
        .then(() => {
            console.log("connected to the db.");
      }).catch(err => {
            console.log("error in connecting. ERR: "+err);
        });

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

