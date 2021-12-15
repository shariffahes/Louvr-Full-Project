const Exhibition = require("../models/Exhibition");
const SelectedArts = require("../models/SelectedArts");
const User = require("../models/User");
const session = require("../session");
const mongoose = require("mongoose");

//the following method will be executed when router is fetching exhibition home
//( /exhibition )
const index = async (req, res) => {
  try{
  //if in the query there is loaded, then the requested exhibition are a result
  //of the client pressing load more.
  //otherwise it is the first time loading exhibition.
  const loaded = parseInt(req.query.loaded ?? 0);

  //skip the previously loaded exhibitions and get 4 more exhibitions.
  const exhibitions = await Exhibition.find({}).skip(loaded).limit(4);
  
  //check if the session has a loggedIn field to know if the user is login
  const isLoggedIn = session.getSession().loggedIn;
  let result;
  //if user has a login, then this value stored is the id of the user.
  //which can be used to find the current user
  if (isLoggedIn) result = await User.findById(isLoggedIn, "registeredExhibitions");
  
  //fetching the current user is important, since we need to know if the user
  //has registered the exhibition or not.
  //so get all registered exhibitions for the user in order to compare them in the
  //exhibitions page
  if (result) result = result.registeredExhibitions
  else result = [];

  //if loaded is greater than 0 then send the exhibitions only.
  //otherwise render exhibitions and provide the loggedIn status along with exhibitions data
  //and the registered exhibitions for the current user.
  if(loaded > 0) res.send(exhibitions);
  else res.render("../views/exhibitions.ejs", { data: exhibitions, loggedIn: session.getSession().loggedIn, exhibitionsRegistered: Array.from(result)});
  }catch(error) {
    console.log(error);
  }
};

//this will be executed if the home page (index) is requested.
const main = async (_, res) => {
  try{
  //get the selectedArts.
  const allArts = await SelectedArts.find({});
  //get the first 3 exhibitions which will be shown in the main page.
  const highlightedExhibitions = await Exhibition.find({}).limit(3);
  //check the user login status.
  const isLoggedIn = session.getSession().loggedIn;

  //render the home page with all the provided information
  res.render("../views/home.ejs", {
    selectedArts: allArts,
    exhibitions: highlightedExhibitions,
    loggedIn: isLoggedIn
  });
}catch(error) {
  console.log(error);
}
};

//execute the following method when booking page ( /booking/:id)
const booking = async (req,res) => {
  //each exhibition has its own information.
  //thus when you press book now, you are redirected to /booking/exhibitionID
  //this id will be accessed through the params value of the request.
  const id = req.params.id;

  try{
  
  if (mongoose.Types.ObjectId.isValid(id)) {
    //get the title, price, and seatsAvaulable for the exhibition.
    const exhibition = await Exhibition.findById(id, "title price seatsAvailable");
    //get the user first and last name along with the email and his/her wallet.
    const user = await User.findById(session.getSession().loggedIn,"firstName lastName email credits");

    //render book.ejs with all the needed information.
    res.render("../views/book.ejs", { loggedIn: session.getSession().loggedIn, userInfo: user, exhibitionInfo: exhibition });

  }else{
    console.log("You should login to access the booking page");
  }
}catch(error) {
  console.log(error);
}
};

//execute this message when buy ticket is requested.
const buyTicket = async (req,res) => {
  //the id of the exhibition is send through the form by post method.
  const id = req.body.id;
  //get the user ID (the client is definetly signed in otherwise this will not be presented).
  const userID = session.getSession().loggedIn;
  try{
  //find the user.
  const user = await User.findById(userID);
  const userExhibitions = user.registeredExhibitions ?? [];
  //add exhibition to registered only if this exhibition is not registered by user 
  if(userExhibitions.indexOf(id) === -1)  userExhibitions.push(id);
  await Exhibition.findByIdAndUpdate(id, { seatsAvailable: req.body.remainingTickets});

  await User.findByIdAndUpdate(userID, { credits: req.body.credits, registeredExhibitions: userExhibitions});
  }catch(error) {
    console.log(error);
  }
  //redirect user to the exhibition page 
  res.redirect("/exhibition");
}; 

//called when router is requesting to unregister the exhibition
const unregister = async (req,res) => {
  //extract the id from the req (/exhibitions/unregister/:id)
  const Id = req.params.id;
  try{
  const user = await User.findById(session.getSession().loggedIn);
  const registered = user.registeredExhibitions;
  const updatedRegister = registered.filter((elem) => !elem.equals(Id) );
  await User.findByIdAndUpdate(session.getSession().loggedIn,{ registeredExhibitions: updatedRegister});
  }catch(error) {
    console.log(error);
  }
  //refresh page and redirect user to exhibition/
  res.redirect("/exhibition");
};

module.exports = { index, main, booking, buyTicket, unregister };
