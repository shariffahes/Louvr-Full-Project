const Exhibition = require("../models/Exhibition");

 const index = async (req, res) => {
   const r =  await Exhibition.count({});
};

const exhibition_list = async (req, res) => {
    console.log("found me");
}
module.exports = {index, exhibition_list};
