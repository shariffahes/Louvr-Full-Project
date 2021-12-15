const express = require("express");
const router = express.Router();
const ExhibitionController = require('../controllers/exhibitionController');

//when home (/) is requested check the rest of the url

//if posting data to /booking/buyTicket.
//execute the buyTicket in the conroller which will deal with the logic.
router.post("/booking/buyTicket", ExhibitionController.buyTicket);

//if requesting /unregister/Exhibition/ then any form of data.
//execute unregister method
router.get("/unregisterExhibition/:id", ExhibitionController.unregister);

//if requesting /booking/any form.
//execute booking method
router.get("/booking/:id", ExhibitionController.booking);

//if just requesting / then execute the main method to render the index (home) file.
router.get("/", ExhibitionController.main);

//export the router to use it in the server
module.exports = router;