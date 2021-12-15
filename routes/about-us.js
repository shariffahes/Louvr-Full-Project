const express = require("express");
const router = express.Router();
const path = require("path");
const FeedbackController = require("../controllers/feedbackController");
const session = require("../session");

//execute the method and render the about page if the url is /about-us
router.get("/", (_, res) => {
    res.render(path.resolve(__dirname + "/../views/about.ejs"), { loggedIn: session.getSession() });
});

//in the about page, there is a form which will post some data to /about-us/feedback
//when submit is clicked.
router.post("/feedback",FeedbackController);


module.exports = router;