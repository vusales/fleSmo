const mongoose = require('mongoose');

const SubsForEachNewPost =  new mongoose.Schema({
    title: String ,
    price: Number , 
    currency: String , 
    incrementStep: Number ,
}); 

const SubsPerPeriodPerPage =  new mongoose.Schema({
    title: String ,
    price: Number , 
    currency: String , 
    incrementStep: Number ,
});

const SubsSettings = new mongoose.Schema({
    defaultPostForPeriod: Number , 
    repeatTaskPerDay: String , 
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
    subscriptions : [Subs] , 
},
{
    collection:"subscriptions",
});

var Subscriptions = mongoose.model("subscriptions" , SubscriptionsSchema );

module.exports = Subscriptions;