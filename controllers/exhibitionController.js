const Exhibition = require("../models/Exhibition");

function index (req, res) {
   const r =  Exhibition.find({});
   console.log(r);
};

module.exports = index;