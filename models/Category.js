const mongoose = require("mongoose"); 

const SubCategories =  new mongoose.Schema({
    icon: {
        type: String , 
    }, 
    categoryName: {
        type: String , 
    }, 
    link: {
        type: String , 
    }, 
});

const CategorySchema  =  new mongoose.Schema({
    icon: {
        type: String , 
    }, 
    categoryName: {
        type: String , 
    }, 
    link: {
        type: String , 
    }, 
    subCategories : [{type: mongoose.Schema.Types.ObjectId , ref: "SubCategories"  }], 
}); 


let Category =  mongoose.model("Categories" , CategorySchema ); 
let SubCatgory =  mongoose.model("SubCategories" , SubCategories ); 

module.exports = {
    Category , 
    SubCatgory , 
}; 
