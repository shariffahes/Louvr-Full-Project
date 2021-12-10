const User = require("../models/User");
const bcrypt = require("bcrypt");
var session= require("../session");
const saltRounds = 8;

const login =  (req,res) => {
    res.render("../views/user.ejs",{logInPage: true,loggedIn: session.getSession()});
};
const signUp = (_,res) => {
    res.render("../views/user.ejs", {logInPage: false,loggedIn: session.getSession(), signup: true });
};
const createUser = async (req,_) => {
    const extractedData = req.body;
    const userToInsert = new User({
        firstName: extractedData.fName,
        lastName: extractedData.lName,
        userName: extractedData.userName,
        email: extractedData.email,
        password: extractedData.password,
        memberShip: "standard",
        credits: 0,
        dateOfBirth: extractedData.birthDate
    });
   
    bcrypt.hash(req.body.password, saltRounds, (err, hashedPass) => {
        if(err) {
            console.log(err);
            return;
        }
        userToInsert.password = hashedPass;
        userToInsert.save()
                    .then( () => {
                        console.log("successful")
                    }).catch(err => {
                        console.log(err);
                    });
                });
};
const authenticatUser = async (req,res) => {
   const credentialsInfo = req.body;
   const isAccountValid = await User.findOne({ email: credentialsInfo.email},'email password');
   if(isAccountValid) {
    const pass = isAccountValid.password;
    bcrypt.compare(credentialsInfo.password,pass,(err,result) => {
        if(err) {
            console.log(err);
            return;
        }
        if(result) {
            req.session.loggedIn = true;
            session.setSession(req.session);
            res.redirect("/");
        }else{
            console.log("incorrect");
        }
    })
   }else {
       console.log("the email is incorrect");
   }
};

const signout = (req,res) => {
    req.session.loggedIn = false;
    session.setSession(req.session);
    res.redirect("/");
}
module.exports = {login,signUp, createUser, authenticatUser, signout};