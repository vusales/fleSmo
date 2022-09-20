const mongoose = require('mongoose');

const SiteStatistics =  new mongoose.Schema({
    icon: {
        type: String , 
    } , 
    amount: {
        type: Number , 
    } , 
    description: {
        type: String , 
    } , 
}); 

var  SiteStatisticsModel = mongoose.model( "SiteStatistics" , SiteStatistics ) ; 

module.exports = SiteStatisticsModel ;