const mongoose = require("mongoose") ; 

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

const ProductOptionsSchema =  mongoose.Schema({
    title: {
        type: String , 
    },
    price: {
        type: String , 
    }, 
    serviceName: {
        type: String , 
    },  
    serviceAmount: {
        type: Number , 
    }, 
    serviceIncreasementStep: {
        type: Number , 
    }, 
    productDescription: {
        type: String , 
    }, 
    productDescription: {
        type: String , 
    },
    anouncementText:{
        type: String , 
    }, 
    productFeatures : {
        type: [ProductFeaturesSchema] , 
    },
}); 

const ProductFeature = mongoose.model("ProductFeature" ,  ProductFeaturesSchema ) ;
const ProductOptions =  mongoose.model("ProductOptions" , ProductOptionsSchema );

module.exports =  {
    ProductOptions, 
    ProductFeature ,
}; 
