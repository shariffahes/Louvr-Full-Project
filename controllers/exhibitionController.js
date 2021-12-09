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

    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects"
    const responseIDs = await got(url);
    const responseJSON = JSON.parse(responseIDs.body);
    const IDS = responseJSON.objectIDs;
    // console.log(IDS);
    const imagesResults = [];
    
    for(var i=0;i<8;i++){
        const ran = Math.floor((Math.random()*4000+500));
        const id = IDS[ran];
         const tempURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
         const responseURL = await got(tempURL);
         const responseURLJSON = JSON.parse(responseURL.body);
         const imageAPIs = responseURLJSON.primaryImage;
         if(imageAPIs!=''){
            imagesResults[i]=imageAPIs;
         }else{
             i--;
         }
    }
    // const imagestoEJS = JSON.parse(imagesResults);

    //AJAX 
    res.render("../views/home.ejs", { selectedArts: allArts, exhibitions: highlightedExhibitions, galleryAPI: imagesResults});
};

module.exports = { index, main};
