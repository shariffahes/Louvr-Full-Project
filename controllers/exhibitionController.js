const Exhibition = require("../models/Exhibition");
const SelectedArts = require("../models/SelectedArts");

const index = async (req, res) => {
   const r =  await Exhibition.find({});
   res.render("../views/exhibitions.ejs",{data: r});
};

const main = async (req,res) => {
    //Selected Arts Rednering
    const allArts = await SelectedArts.find({});
    const highlightedExhibitions = await Exhibition.find({}).limit(3);

    res.render("../views/home.ejs", { selectedArts: allArts, exhibitions: highlightedExhibitions});
};

module.exports = { index, main};
