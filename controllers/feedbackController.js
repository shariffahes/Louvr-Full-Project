const Feedback = require("../models/Feedback");

//called when user wants to submit a feedback
const feedbackPost = async (req, res) => {
  //get the data from the body
  const extractedData = req.body;
  //fill the object with the necassary fields
  const feedbackToInsert = new Feedback({
    firstName: extractedData.firstName,
     lastName: extractedData.lastName,
     email: extractedData.email,
     phonenum: extractedData.phone,
     description: extractedData.feedback
  });

  //add the feedback to the database
  feedbackToInsert
    .save()
    .then(() => {
      console.log("successful");
      res.redirect("/about-us");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = feedbackPost;