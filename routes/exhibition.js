const express = require("express");
const router = express.Router();
const ExhibitionController = require('../controllers/exhibitionController');

router.get("/", ExhibitionController.index);

module.exports = router;