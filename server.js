const express = require("express");
const multer = require("multer");
const homeRouter = require("./routes/home");
const exhibitionRouter = require("./routes/exhibition");
const aboutUsRouter = require("./routes/about-us");
const visitRouter = require("./routes/visit");
const user = require("./routes/user");

const app = express();
app.set("view engine","ejs");

app.use("/",homeRouter);
// app.use("/exhibition", exhibitionRouter);
// app.use("/visit", visitRouter);
// app.use("/about-us", aboutUsRouter);
// app.use("/user",user);
app.use(express.static(__dirname + "/public/html"));
app.use(express.static(__dirname + "/public/styles"));


app.listen(8081, () => {
    console.log("listening to server");
});