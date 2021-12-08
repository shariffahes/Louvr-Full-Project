const Exhibition = require("../models/Exhibition");

const index = async (req, res) => {
   const r =  await Exhibition.find({});
   res.render("../views/exhibitions.ejs",{data: r});
};

const main = (res,req) => {
    console.log("ff");
};

module.exports = { index, main};
