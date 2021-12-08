const Exhibition = require("../models/Exhibition");

const index = async (req, res) => {
   const r =  await Exhibition.count({});
   res.render("../views/exhibitions.ejs");
};

const main = (res,req) => {
    console.log("ff");
};

module.exports = { index, main};
