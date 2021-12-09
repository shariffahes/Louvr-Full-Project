const Feedback = require("../models/Feedback");

const feedbackPost = (req, _) => {
  const extractedData = req.body;
  const feedbackToInsert = new Feedback({
    firstName: extractedData.firstName,
    lastName: extractedData.lastName,
    email: extractedData.email,
    phonenum: extractedData.phone,
    desacription: extractedData.feedback,
  });
  feedbackToInsert
    .save()
    .then(() => {
      console.log("successful");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = feedbackPost;