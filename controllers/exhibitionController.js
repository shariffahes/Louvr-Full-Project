const Exhibition = require("../models/Exhibition");
const SelectedArts = require("../models/SelectedArts");
const got = require("got");
const { rawListeners } = require("../models/Exhibition");

const index = async (req, res) => {
  const exhibitions = await Exhibition.find({});
  res.render("../views/exhibitions.ejs", { data: exhibitions });
};

const main = async (req, res) => {
  //Selected Arts Rednering
  const allArts = await SelectedArts.find({});
  const highlightedExhibitions = await Exhibition.find({}).limit(3);

  const imagesURLs = [
    "459062",
    "49112",
    "459087",
    "459110",
    "436037",
    "437826",
    "437532",
    "437329",
    "435739",
    "12602",
    "438817",
    "547951",
    "440393",
    "11417",
    "13245",
    "435844",
    "10481",
    "10813",
    "10065",
    "437423",
    "12670",
    "436095",
    "71077",
    "813585",
    "437299",
    "10175",
    "11375",
    "436838",
    "441769",
    "11834",
    "19261",
    "459055",
    "16584",
    "437160",
    "436532",
    "459086",
    "437790",
    "11797",
    "11207",
    "470304",
    "436603",
    "436282",
    "20888",
    "459131",
    "764091",
    "19303",
    "436851",
    "436101",
    "11981",
    "13171",
    "708024",
    "698529",
    "250939",
    "435851",
    "254502",
    "463973",
    "327520",
    "10574",
    "544227",
    "54486",
    "342185",
    "250951",
  ];
  const imagesResults = [];
  for (var i = 0; i < 8; i++) {
    const ran = Math.floor(Math.random() * imagesURLs.length);

    const ID = imagesURLs[ran];
    imagesURLs[ran] = undefined;
    console.log(ID);
    if (ID) {
      const tempURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${ID}`;
      const responseURL = await got(tempURL);
      const responseURLJSON = JSON.parse(responseURL.body);
      const imageAPIs = responseURLJSON.primaryImage;
      console.log(imageAPIs);

      if (imageAPIs != "") {
        imagesResults[i] = imageAPIs;
      } else {
        console.log("not found");
        i--;
      }
    } else {
      i--;
    }
  }

  //AJAX
  res.render("../views/home.ejs", {
    selectedArts: allArts,
    exhibitions: highlightedExhibitions,
    galleryAPI: imagesResults,
  });
};

module.exports = { index, main };
