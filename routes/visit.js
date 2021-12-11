const express = require("express");
const router = express.Router();
const session = require("../session");
router.get("/", (_,res) => {
    res.render("../views/visit.ejs",{loggedIn: session.getSession().loggedIn});
});

module.exports = router;