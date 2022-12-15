const mongoose =  require("mongoose"); 

const PromotionSchema =  mongoose.Schema({
    promotion: {
        type: String , 
    }, 
    color: {
        type: String , 
    }
}); 

const ProductSchema =  mongoose.Schema({
    image: {
        type: String
    }, 
    title:  {
        type: String
    }, 
    price:{ 
        type : Number 
    },
    discountPrice:{ 
        type : Number 
    },
    description:{
        type: String
    }, 
    link:{
        type: String
    },
    excerpt:{
        type: String , 
    }, 
    options: {type: mongoose.Schema.Types.ObjectId , ref: "ProductOptions"}, 
    promotions: [PromotionSchema], 
    categories: [{type: mongoose.Schema.Types.ObjectId , ref: "Categories"}], 
}); 

const Product =  mongoose.model("Product", ProductSchema ); 
const Promotion =  mongoose.model("Promotion" , PromotionSchema); 

module.exports = 
{
    Product, 
    Promotion, 
}; 