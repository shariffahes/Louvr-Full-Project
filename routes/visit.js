const express = require("express");
const router = express.Router();
const session = require("../session");

//when visit is requested, render its view page.
router.get("/", (_,res) => {
    //check the session if it contains loggedIn.
    //loggedIn is given to visit in order to change the navbar according to status
    //present login or signout in the navbar
    res.render("../views/visit.ejs",{loggedIn: session.getSession().loggedIn});
});

module.exports = router;