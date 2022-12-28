const mongoose = require('mongoose');


const servicessValues =  new mongoose.Schema({ 
    title: String ,
    itemPrice: Number , 
    currency: String , 
    incrementValues: Array ,
    amount: Number , 
}) ; 

const SubscriptionServicess =  new mongoose.Schema({
    service_title: String , 
    service_values : [{type: mongoose.Schema.Types.ObjectId , ref: "ServicessValues" }]
}); 

var SubscriptionTypes = new mongoose.Schema({
    icon: String , 
    title: String , 
    image: String , 
    promotionMethod: String , 
    servicess: [{ type: mongoose.Schema.Types.ObjectId , ref: "SubscriptionServicess" }] , 
});

var SubscriptionsMainSchema = new mongoose.Schema({
    price : Number , 
    title: String , 
    subTitle: String ,  
    description: String , 
    subscriptions : [{type: mongoose.Schema.Types.ObjectId , ref: "SubscriptionTypes" }] , 
});

var SubscriptionsMainSchemaModel= mongoose.model("SubscriptionsMainSchema" , SubscriptionsMainSchema );
var SubscriptionTypesModel = mongoose.model("SubscriptionTypes" , SubscriptionTypes );
var SubscriptionServicessModel = mongoose.model("SubscriptionServicess" , SubscriptionServicess );
var ServicessValuesModel = mongoose.model("ServicessValues" , servicessValues );

module.exports = {
    SubscriptionsMainSchemaModel , 
    SubscriptionTypesModel ,  
    SubscriptionServicessModel ,
    ServicessValuesModel ,
};
