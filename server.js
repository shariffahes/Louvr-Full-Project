const express = require("express");
const session = require("express-session");
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

//use the session middleware
//secret is the key used to authenticate the session.
app.use(session({
    secret: "secret"
}));

//set the paths for the view and inform express that the view is of ejs type
//enable express to understand json and parse the requested url.
app.set('views', path.join(__dirname, '/views'));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//use these router files on differen requested url
app.use("/",homeRouter);
app.use("/exhibition", exhibitionRouter);
app.use("/visit", visitRouter);
app.use("/about-us", aboutUsRouter);
app.use("/user",user);

//set the paths of the static files
app.use(express.static(path.join(__dirname ,"public/html")));
app.use(express.static(path.join(__dirname, "public/styles")));
app.use(express.static(path.join(__dirname, "public/images")));
app.use(express.static(path.join(__dirname, "public/fonts")));
app.use(express.static(path.join(__dirname, "public/scripts")));

//when page not found, display 404 page
app.use((_,res) => {
    res.status(404).sendFile(__dirname+"/public/html/404.html");
});

//keep listening to port 8081 on the localhost
app.listen(8081, () => {
    console.log("listening to server");
});