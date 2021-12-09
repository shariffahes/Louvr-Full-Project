const express = require("express");
const router = express.Router();
const path = require("path");
const feedbackPost = require("../controllers/feedbackController");

router.get("/", (_, res) => {
    res.render(path.resolve(__dirname+"/../views/about.ejs"));
});
router.post("/feedback",feedbackPost);


module.exports = router;