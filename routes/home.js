const express = require("express");
const router = express.Router();
const ExhibitionController = require('../controllers/exhibitionController');
const path = require("path");

router.get("/", ExhibitionController.main);

router.get("/book", (req,res) => {
    res.sendFile(path.resolve(__dirname+"/../public/html/book.html"))
});
module.exports = router;