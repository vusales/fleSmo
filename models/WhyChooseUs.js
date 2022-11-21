const mongoose = require('mongoose');

const WhyChoose =  new mongoose.Schema({
    icon: {
        type: String , 
    } , 
    title: {
        type: String , 
    } , 
    description: {
        type: String , 
    } , 
}); 

var  WhyChooseModel = mongoose.model( "WhyChooseUs" , WhyChoose ) ; 

module.exports = WhyChooseModel;

