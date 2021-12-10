const Exhibition = require("../models/Exhibition");
const SelectedArts = require("../models/SelectedArts");
const session = require("../session");

const index = async (req, res) => {
  const exhibitions = await Exhibition.find({});
  res.render("../views/exhibitions.ejs", { data: exhibitions, loggedIn: session.getSession() });
};

const main = async (req, res) => {
  const allArts = await SelectedArts.find({});
  const highlightedExhibitions = await Exhibition.find({}).limit(3);
  
  //AJAX
  res.render("../views/home.ejs", {
    selectedArts: allArts,
    exhibitions: highlightedExhibitions,
    loggedIn: session.getSession()
  });
};

module.exports = { index, main };
