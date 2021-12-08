const Exhibition = require("../models/Exhibition");
const SelectedArts = require("../models/SelectedArts");

const index = async (req, res) => {
   const r =  await Exhibition.find({});
   res.render("../views/exhibitions.ejs",{data: r});
};

const main = async (req,res) => {
    //Selected Arts Rednering
    const r = await SelectedArts.find({});
    res.render("../views/home.ejs",{selectedArts: r});
};

module.exports = { index, main};
