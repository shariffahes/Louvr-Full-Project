const express = require("express");
const router = express.Router();
const ExhibitionController = require('../controllers/exhibitionController');
const session = require("../session");


router.post("/booking/buyTicket", ExhibitionController.buyTicket);
router.get("/unregisterExhibition/:id", ExhibitionController.unregister);
router.get("/booking/:id", ExhibitionController.booking);
router.get("/", ExhibitionController.main);

module.exports = router;