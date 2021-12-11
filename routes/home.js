const express = require("express");
const router = express.Router();
const ExhibitionController = require('../controllers/exhibitionController');
const session = require("../session");
const path = require("path");
const { findById } = require("../models/User");

router.get("/", ExhibitionController.main);

//router.get("/book/:id", ExhibitionController.booking);
module.exports = router;