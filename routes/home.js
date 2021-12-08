const express = require("express");
const router = express.Router();
const index = require('../controllers/exhibitionController');

router.get("/", index);

module.exports = router;