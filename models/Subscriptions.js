const mongoose = require('mongoose');

const SubsForEachNewPost =  new mongoose.Schema({
    title: String ,
    price: Number , 
    currency: String , 
    incrementStep: Number ,
    amount: Number , 
}); 

const SubsPerPeriodPerPage =  new mongoose.Schema({
    title: String ,
    price: Number , 
    currency: String , 
    incrementStep: Number ,
    amount: Number , 
});

const SubsSettings = new mongoose.Schema({
    defaultPostForPeriod: Number , 
    repeatTaskPerDay: Array , 
}); 

var Subs = new mongoose.Schema({
    icon: String , 
    title: String , 
    image: String , 
    promotionMethod: String , 
    subscriptionsSettings : SubsSettings ,
    forEachNewPost: [SubsForEachNewPost] , 
    perPeriodPerPage: [SubsPerPeriodPerPage] , 
});

var SubscriptionsSchema = new mongoose.Schema({
    price : Number , 
    title: String, 
    subTitle: String ,  
    description: String , 
    subscriptions : [{type: mongoose.Schema.Types.ObjectId , ref: "SubscriptionDetails"  }] , 
},
{
    collection:"subscriptions",
});

var Subscriptions = mongoose.model("subscriptions" , SubscriptionsSchema );
var SubsModel = mongoose.model("SubscriptionDetails" , Subs );

module.exports = {
    Subscriptions , 
    SubsModel , 
};
