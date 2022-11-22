const mongoose = require('mongoose');

var characteristicCards = new mongoose.Schema({
    icon: String , 
    title: String , 
}); 

var PagesIntro = new mongoose.Schema({
    pageName: String , 
    pageContent : {
        intro: String , 
        title: String , 
        bannerDescription : String , 
        image: String , 
        characteristicCards :  [{type: mongoose.Schema.Types.ObjectId , ref: "CharacteristicCards"}]
    } 
},
{
    collection:"PagesIntro",
});

var PagesIntroModel = mongoose.model("PagesIntro" , PagesIntro ); 
var CharacteristicCardsModel = mongoose.model("CharacteristicCards" , characteristicCards ); 

module.exports = {
    PagesIntroModel , 
    CharacteristicCardsModel ,
}; 