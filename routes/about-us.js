const express = require("express");
const router = express.Router();
const path = require("path");
const FeedbackController = require("../controllers/feedbackController");
const session = require("../session");

router.get("/", (_, res) => {
    res.render(path.resolve(__dirname + "/../views/about.ejs"), { loggedIn: session.getSession() });
});
router.post("/feedback",FeedbackController);


module.exports = router;