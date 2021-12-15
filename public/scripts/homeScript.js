//specified specific number of urls from the MET to request them 
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
    "450393",
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
    "435641",
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
    "19200",
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

const getImageURL = async () => {
try {
    //we need 8 images in the home page
    for (var i = 0; i < 8; i++) {
        //keep choosing random values from the provided image ids
        const ran = Math.floor(Math.random() * imagesURLs.length);
        const ID = imagesURLs[ran];
        //turn the image id to undefined when this id is chosen/
        //prevemt duplication of images/
        imagesURLs[ran] = undefined;

        //if ID is not undefined, will proceed
        if (ID) {
            //the url of the met museum to get the info about a specific id.
            const tempURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${ID}`;
            //wait till we get a response
            const responseURL = await fetch(tempURL);
            //wait till the response is parse to json.
            const responseJSON = await responseURL.json();
            //access the primaryImage field
            const imageAPIs = responseJSON.primaryImage;
            //get which grid item in the main page and manipulate its background image to the url.
            document.getElementById("item" + (i + 1)).style.backgroundImage = `url(${imageAPIs})`;

            //if the chosen id has image, then all is good/
            //otherwise we have to repeat the process.
            if (imageAPIs != "") {
                imagesResults[i] = imageAPIs;

            } else {
                i--;
            }
        } else {
            //the id is undefined (chosen previously) so repeat the process.
            i--;
        }
    }
}catch (error) {
    //catch any error thrown from the fetch request or parsing to json.
    console.log(error);
}
};
getImageURL();
