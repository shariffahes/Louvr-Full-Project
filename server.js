const express = require("express");
const multer = require("multer");
const path = require("path");
const homeRouter = require("./routes/home");
const exhibitionRouter = require("./routes/exhibition");
const aboutUsRouter = require("./routes/about-us");
const visitRouter = require("./routes/visit");
const user = require("./routes/user");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Louvre")
    .then(() => {
        console.log("connected to the db.");
    }).catch(err => {
        console.log("error in connecting. ERR: " + err);
    });
const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded());

app.use("/",homeRouter);
app.use("/exhibition", exhibitionRouter);
app.use("/visit", visitRouter);
app.use("/about-us", aboutUsRouter);
app.use("/user",user);

app.use(express.static(__dirname + "/public/html"));
app.use(express.static(__dirname + "/public/styles"));
app.use(express.static(__dirname + "/public/fonts"));
app.use(express.static(__dirname + "/public/images"));
app.listen(8081, () => {
    console.log("listening to server");
});