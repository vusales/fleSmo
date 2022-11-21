const mongoose = require("mongoose"); 

const ProductFeaturesSchema = mongoose.Schema({
    icon : {
        type: String , 
    }, 
    title: {
        type: String , 
    }, 
    description : {
        type: String , 
    }
});
