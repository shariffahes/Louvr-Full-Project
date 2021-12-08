const express = require("express");
const router = express.Router();
const ExhibitionController = require('../controllers/exhibitionController');

router.get("/", ExhibitionController.main);

module.exports = router;