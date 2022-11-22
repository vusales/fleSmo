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
    title: String , 
    subTitle: String ,  
    description: String , 
    subscriptions : [{type: mongoose.Schema.Types.ObjectId , ref: "SubscriptionDetails" }] , 
},
{
    collection:"subscriptions",
});

var Subscriptions = mongoose.model("Subscriptions" , SubscriptionsSchema );
var SubsModel = mongoose.model("SubscriptionDetails" , Subs );
var SubsForEachNewPostModel = mongoose.model("SubsForEachNewPost" , SubsForEachNewPost );
var SubsPerPeriodPerPageModel = mongoose.model("SubsPerPeriodPerPage" , SubsPerPeriodPerPage );
var SubsSettingsModel = mongoose.model("SubsSettings" , SubsSettings );

module.exports = {
    Subscriptions , 
    SubsModel ,  
    SubsForEachNewPostModel ,
    SubsPerPeriodPerPageModel ,  
    SubsSettingsModel , 
};
