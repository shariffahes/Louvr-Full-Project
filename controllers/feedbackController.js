const Feedback = require("../models/Feedback");

const feedbackPost = async (req, res) => {
  const extractedData = req.body;
  const feedbackToInsert = new Feedback({
    firstName: extractedData.firstName,
     lastName: extractedData.lastName,
     email: extractedData.email,
     phonenum: extractedData.phone,
     description: extractedData.feedback
  });

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