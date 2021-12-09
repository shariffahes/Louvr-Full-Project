const Exhibition = require("../models/Exhibition");
const SelectedArts = require("../models/SelectedArts");
const got = require("got");
const { rawListeners } = require("../models/Exhibition");

const index = async (req, res) => {
   const exhibitions =  await Exhibition.find({});
    res.render("../views/exhibitions.ejs", { data: exhibitions});
};

const main = async (req,res) => {
    //Selected Arts Rednering
    const allArts = await SelectedArts.find({});
    const highlightedExhibitions = await Exhibition.find({}).limit(3);

    // const url = "https://openaccess-api.clevelandart.org/api/artworks?limit=30&dimensions_max=100,300,300"
    // const responseIDs = await got(url);
    // const responseJSON = JSON.parse(responseIDs.body);
    // const results = responseJSON.data;
    // const imagesURLs = [];

    // for(var i=0;i<9;i++){
    //     const ran = Math.floor((Math.random()*39+0));
    //      const imageAPIs = results[ran]?.images?.web?.url;
    //      console.log(imageAPIs);
    //      if(imageAPIs!=''){
    //          imagesURLs[i]=imageAPIs;
    //      }else{
    //          console.log("not found");
    //          i--;
    //      }
    // }

    const imagesURLs = ['459062','49112','486309','459087','459110','436037','437826','437532','437329','435739','12602','486308','438817','547951','440393','11417','13245','435844','10481','10813','10065','437423','12670','436095','815112','813585','437299','10175','11375','436838','441769','11834','19261','459055','16584','437160','10127','436532','459086','437790','11797','11207','470304','436603','834263','436282','20888','459131','764091','19303','436851','436101','11981','13171','708024','698529','250939','435851','10909','254502','463973','327520','10574','544227','54486','312079','766536','250951'];
    const imagesResults = [];

    for(var i=0;i<9;i++){
        const ran = Math.floor((Math.random()*(imagesURLs.length)));
        const ID = imagesURLs[ran];
        const tempURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${ID}`;
         const responseURL = await got(tempURL);
         const responseURLJSON = JSON.parse(responseURL.body);
         const imageAPIs = responseURLJSON.primaryImage;
         console.log(imageAPIs);

           if(imageAPIs!=''){
            imagesResults[i]=imageAPIs;
         }else{
             console.log("not found");
             i--;
         }
    }
    
    //AJAX 
    res.render("../views/home.ejs", { selectedArts: allArts, exhibitions: highlightedExhibitions, galleryAPI: imagesResults});
};

module.exports = { index, main};
