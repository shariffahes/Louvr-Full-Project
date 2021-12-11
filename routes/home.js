const express = require("express");
const router = express.Router();
const ExhibitionController = require('../controllers/exhibitionController');
const session = require("../session");
const path = require("path");

router.get("/", ExhibitionController.main);

router.get("/book", (req,res) => {
    res.render(path.resolve(__dirname+"/../views/book.ejs"),{loggedIn: session.getSession()});
});
module.exports = router;