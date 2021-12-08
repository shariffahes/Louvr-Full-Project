const express = require("express");
const multer = require("multer");
const app = express();

app.set("view engine","ejs");

app.get("/", (req,res) => {
    res.render(__dirname+"/views/home");
})



app.use(express.static(__dirname + "/public/html"));
app.use(express.static(__dirname + "/public/styles"));
app.listen(8081, () => {
    console.log("listening to server");
});