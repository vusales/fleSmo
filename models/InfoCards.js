const mongoose = require('mongoose');

var InfoCardsSchema = new mongoose.Schema({
    icon: {
        type: String,
    } , 
    title: String , 
    description: String , 
},
{
    collection:"infoCards",
});

var InfoCards = mongoose.model("infoCards" , InfoCardsSchema );

module.exports =  InfoCards ; 