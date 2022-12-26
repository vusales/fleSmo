const mongoose = require('mongoose');
const UploadedFiles =  require("./UploadedFiles"); 

var BannerSchema = new mongoose.Schema({
    intro: String , 
    title : String , 
    subTitle : String , 
    description : String , 
    buttons : Array , 
    // image: String  ,
    uploadedFile: UploadedFiles.schema ,
},
{
    collection:"banner",
});

var Banner = mongoose.model("banner" , BannerSchema );
module.exports = Banner; 

