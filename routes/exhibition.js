const express = require("express");
const router = express.Router();
const ExhibitionController = require('../controllers/exhibitionController');

//the only routing in the exhibition is the home (/exhibitions)
router.get("/", ExhibitionController.index);

module.exports = router;