const express = require("express");
const router = express.Router();
const session = require("../session");
router.get("/", (req,res) => {
    res.render("../views/visit.ejs",{loggedIn: session.getSession()});
});

module.exports = router;