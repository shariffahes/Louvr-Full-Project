const express = require("express");
const router = express.Router();
const ExhibitionController = require('../controllers/exhibitionController');
const session = require("../session");


router.get("/book/:id", ExhibitionController.booking);
router.get("/", ExhibitionController.main);

module.exports = router;