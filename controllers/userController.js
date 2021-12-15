const User = require("../models/User");
const bcrypt = require("bcrypt");
const session= require("../session");
const saltRounds = 8;

//called when router is (/user/login)
const login =  (_,res) => {
    //pass the logInPage variable to present the email and password field
    //pass the loggedIn from session to know what to present in the navbar
    res.render("../views/user.ejs",{logInPage: true, loggedIn: session.getSession().loggedIn});
};
//called on /user/signup
const signUp = (_,res) => {
    //logInPage false to present the signup info.
    res.render("../views/user.ejs", {logInPage: false, loggedIn: session.getSession().loggedIn, signup: true });
};
//add user to database
const createUser = async (req,res) => {
    //extract data from body as json
    const extractedData = req.body;
    //fill the fields
    const userToInsert = new User({
        firstName: extractedData.fname,
        lastName: extractedData.lname,
        userName: extractedData.userName,
        email: extractedData.email,
        password: extractedData.password,
        dateOfBirth: extractedData.birthDate
    });
   //hash the password and add salt 
    bcrypt.hash(req.body.password, saltRounds, (err, hashedPass) => {
        //catch error in hashing and salting
        if(err) {
            console.log("error in hashing. ERR"+err);
            return;
        }
        //all is okay
        userToInsert.password = hashedPass;
        //save to database
        userToInsert.save()
                    .then( () => {
                        console.log("successful insertion");
                        res.redirect("/user/login");
                    }).catch(err => {
                        res.redirect("/user/signup");
                        console.log("An error occured during signing up");
                    });
                });
};

const authenticatUser = async (req,res) => {
    //get the info from the body as json
   const credentialsInfo = req.body;
   try{
  //check if there is a user with this email
   const isAccountValid = await User.findOne({ email: credentialsInfo.email},'email password');
   //valid
   if(isAccountValid) {
    //get the password from the database to compare it with the pass input
    const pass = isAccountValid.password;

    //compare using bcryp module
    bcrypt.compare(credentialsInfo.password,pass,(err,result) => {
        if(err) {
            console.log(err);
            return;
        }
        //equal
        if(result) {
            //add to the request a session and a loggedIn variable
            //which contains the userID
            req.session.loggedIn = isAccountValid._id;
            //save the session inside the imported session file
            session.setSession(req.session);
            console.log("password correct");
            //redirect to home page
            res.redirect("/");
        }else{
            //incorrect
            console.log("password incorrect");
            //redirect to /user/login
            res.redirect("/user/login");
        }
    })
   }else {
       res.redirect("/user/login");
       console.log("the email is incorrect");
   }
}catch(err) {
       console.log("an error has occured. ERR:" + err);
}
};
//sign out
const signout = (req,res) => {
    //set the loggedIn in the created session to undefined
    req.session.loggedIn = undefined;
    session.setSession(req.session);
    //redirect to home
    res.redirect("/");
}
module.exports = {login,signUp, createUser, authenticatUser, signout};