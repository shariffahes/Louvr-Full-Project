const express = require("express");
const router = express.Router();
const UserController = require('../controllers/userController');

//if the url requested is /user without other paths.
//it will be redirected to /user/login
router.get("/",(_,res) => {
    res.redirect("/user/login");
});

// url requested user/signup then execute signup method in the user controller
router.get("/signup", UserController.signUp);

// url requested user/login then execute login method in the user controller
router.get("/login",UserController.login);

//in the signup when the user press submit. A post request to /user/create will be requested.
router.post("/create",UserController.createUser);

//authenticate after login.
router.post("/authenticate", UserController.authenticatUser);

// /user/signout
router.get('/signout',UserController.signout);
module.exports = router;