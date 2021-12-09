const ImageKit = require("imagekit");
const imagekit = new ImageKit({
    publicKey: "public_mFpm7FNC5ydwzYqY4dRA357bhrQ=",
    privateKey: "private_kxQIxZGfmrA31WfbWvxJIUTwhx8=",
    urlEndpoint: "https://ik.imagekit.io/zdphhwaxuat/"
});

const getImageURL = (name,dim) => {
   const url = imagekit.url({
        path: name,
        urlEndpoint: "https://ik.imagekit.io/zdphhwaxuat/",
        transformation: [{
            "height": "300",
            "width": "400"
        }]
    });
    console.log(url);
    if (!dim) return `https://ik.imagekit.io/zdphhwaxuat/${name}`
    return `https://ik.imagekit.io/zdphhwaxuat/tr:h-${dim.h},w-${dim.w}/${name}`;
}
module.exports = getImageURL;