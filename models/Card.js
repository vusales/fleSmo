const mongoose =  require("mongoose"); 

const PromotionSchema =  mongoose.Schema({
    promotion: {
        type: String , 
    }, 
    color: {
        type: String , 
    }
}); 

const CardSchema =  mongoose.Schema({
    image: {
        type: String
    } , 
    title:  {
        type: String
    } , 
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
    introDescription:{
        type: String , 
    },
    options:{type: mongoose.Schema.Types.ObjectId , ref: "ProductOptions" }, 
    promotions: [PromotionSchema], 
}); 

const Card =  mongoose.model("Card" , CardSchema ); 
const Promotion =  mongoose.model("Promotion" , PromotionSchema ); 

module.exports = 
{
    Card, 
    Promotion, 
}; 