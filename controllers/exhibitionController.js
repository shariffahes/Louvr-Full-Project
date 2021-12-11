const Exhibition = require("../models/Exhibition");
const SelectedArts = require("../models/SelectedArts");
const session = require("../session");

const index = async (req, res) => {
  const loaded = parseInt(req.query.loaded ?? 0);
  const exhibitions = await Exhibition.find({}).skip(loaded).limit(2);
  if(loaded > 0) res.send(exhibitions);
  else res.render("../views/exhibitions.ejs", { data: exhibitions, loggedIn: session.getSession() });
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

// const booking = (req,res) => {
//   const exhibition = Exhibition.findById({ _id = req.params.id});
//   console.log(exhibition);
// };

module.exports = { index, main };
