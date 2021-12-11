const Exhibition = require("../models/Exhibition");
const SelectedArts = require("../models/SelectedArts");
const User = require("../models/User");
const session = require("../session");
const mongoose = require("mongoose");

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

const booking = async (req,res) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const exhibition = await Exhibition.findById(id, "price seatsAvailable");
    const user = await User.findById(session.getSession().loggedIn,"firstName lastName email credits");
    console.log(exhibition);
    res.render("../views/book.ejs", { loggedIn: session.getSession(), userInfo: user, exhibitionInfo: exhibition });
  }
  
};

module.exports = { index, main, booking };
