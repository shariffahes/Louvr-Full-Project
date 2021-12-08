const User = require("../models/User");

const login =  (req,res) => {
    console.log("login");
};
const signUp = (req,res) => {
    console.log("signUp");
}

module.exports = {login,signUp};