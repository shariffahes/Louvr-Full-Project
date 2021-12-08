const Exhibition = require("../models/Exhibition");

const index = async (req, res) => {
   const r =  await Exhibition.find({});
   res.render("../views/exhibitions.ejs",{data: r});
};

const main = (req,res) => {
    res.render("../views/home.ejs");
};

module.exports = { index, main};
