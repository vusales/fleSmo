const mongoose = require('mongoose');

var characteristicCards = new mongoose.Schema({
    icon: String , 
    description: String , 
}); 

var pageContent =  {
    intro: String , 
    title: String , 
    bannerDescription : String , 
    image: String , 
    characteristicCards : [{type: mongoose.Schema.Types.ObjectId , ref: "CharacteristicCards"}]
} 

var PagesIntro = new mongoose.Schema({
    pageName: String , 
    pageContent : {type: mongoose.Schema.Types.ObjectId , ref: "PageContent"}
},
{
    collection:"PagesIntro",
});

var PagesIntroModel = mongoose.model("PagesIntro" , PagesIntro ); 
var CharacteristicCardsModel = mongoose.model("CharacteristicCards" , characteristicCards );
const PageContentModel =   mongoose.model("PageContent" , pageContent );

module.exports = {
    PagesIntroModel , 
    CharacteristicCardsModel ,
    PageContentModel , 
}; 