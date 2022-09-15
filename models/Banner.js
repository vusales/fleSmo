const mongoose = require('mongoose');
// let schema = mongoose.Schema; 

var BannerSchema = new mongoose.Schema({
    intro: String , 
    title : String , 
    subTitle : String , 
    description : String , 
    buttons : Array , 
    image: String ,
},
{
    collection:"banner",
});

var Banner = mongoose.model("banner" , BannerSchema );

module.exports =  Banner ; 

