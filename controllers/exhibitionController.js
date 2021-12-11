const Exhibition = require("../models/Exhibition");
const SelectedArts = require("../models/SelectedArts");
const User = require("../models/User");
const session = require("../session");
const mongoose = require("mongoose");

const index = async (req, res) => {
  const loaded = parseInt(req.query.loaded ?? 0);
  const exhibitions = await Exhibition.find({}).skip(loaded).limit(4);

  const isLoggedIn = session.getSession().loggedIn;
  let result;
  if (isLoggedIn) result = await User.findById(isLoggedIn, "registeredExhibitions");

  if (result) result = result.registeredExhibitions
  else result = [];
  console.log(result);
  if(loaded > 0) res.send(exhibitions);
  else res.render("../views/exhibitions.ejs", { data: exhibitions, loggedIn: session.getSession().loggedIn, exhibitionsRegistered: Array.from(result)});
};

const main = async (_, res) => {
  const allArts = await SelectedArts.find({});
  const highlightedExhibitions = await Exhibition.find({}).limit(3);
  const isLoggedIn = session.getSession().loggedIn;
  //AJAX
  res.render("../views/home.ejs", {
    selectedArts: allArts,
    exhibitions: highlightedExhibitions,
    loggedIn: isLoggedIn
  });
};

const booking = async (req,res) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const exhibition = await Exhibition.findById(id, "title price seatsAvailable");
    const user = await User.findById(session.getSession().loggedIn,"firstName lastName email credits");
    res.render("../views/book.ejs", { loggedIn: session.getSession().loggedIn, userInfo: user, exhibitionInfo: exhibition });
  }else{
    console.log("You should login to access the booking page");
  }
  
};

const buyTicket = async (req,res) => {
  const id = req.body.id;
  const userID = session.getSession().loggedIn;
  const user = await User.findById(userID);
  const userExhibitions = user.registeredExhibitions ?? [];
  if(userExhibitions.indexOf(id) === -1)  userExhibitions.push(id);
  await Exhibition.findByIdAndUpdate(id, { seatsAvailable: req.body.remainingTickets});
  console.log(userExhibitions);
  await User.findByIdAndUpdate(userID, { credits: req.body.credits, registeredExhibitions: userExhibitions});
  res.redirect("/exhibition");
}; 

const unregister = async (req,res) => {
  const Id = req.params.id;
  const user = await User.findById(session.getSession().loggedIn);
  const registered = user.registeredExhibitions;
  const updatedRegister = registered.filter((elem) => !elem.equals(Id) );
  await User.findByIdAndUpdate(session.getSession().loggedIn,{ registeredExhibitions: updatedRegister});
  res.redirect("/exhibition");
};

module.exports = { index, main, booking, buyTicket, unregister };
