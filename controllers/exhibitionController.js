const Exhibition = require("../models/Exhibition");
const SelectedArts = require("../models/SelectedArts");
const got = require("got");

const index = async (req, res) => {
   const r =  await Exhibition.find({});
   res.render("../views/exhibitions.ejs",{data: r});
};

const main = async (req,res) => {
    //Selected Arts Rednering
    const allArts = await SelectedArts.find({});
    const highlightedExhibitions = await Exhibition.find({}).limit(3);

    const url = "https://openaccess-api.clevelandart.org/api/artworks?limit=30&dimensions_max=100,300,300"
    const responseIDs = await got(url);
    const responseJSON = JSON.parse(responseIDs.body);
    const results = responseJSON.data;
    const imagesURLs = [];

    for(var i=0;i<9;i++){
        const ran = Math.floor((Math.random()*39+0));
         const imageAPIs = results[ran]?.images?.web?.url;
         console.log(imageAPIs);
         if(imageAPIs!=''){
             imagesURLs[i]=imageAPIs;
         }else{
             console.log("not found");
             i--;
         }
    }
    

    //AJAX 
    res.render("../views/home.ejs", { selectedArts: allArts, exhibitions: highlightedExhibitions, galleryAPI: imagesURLs});
};

module.exports = { index, main};
