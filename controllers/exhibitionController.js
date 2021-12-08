const Exhibition = require("../models/Exhibition");

 const index = async (req, res) => {
   const r =  await Exhibition.count({});
};

module.exports = index;
