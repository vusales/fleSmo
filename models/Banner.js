const mongoose = require('mongoose');

var BannerSchema = new mongoose.Schema({
    intro: String , 
    title : String , 
    subTitle : String , 
    description : String , 
    buttons : Array , 
    image: String  ,
    // image: {
    //     type: Buffer , 
    //     contentType: {
    //         type: String , 
    //         default : "image.png"
    //     }
    // },
},
{
    collection:"banner",
});

var Banner = mongoose.model("banner" , BannerSchema );
module.exports = Banner; 

