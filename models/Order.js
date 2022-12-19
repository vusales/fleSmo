const mongoose = require("mongoose"); 

const schema =  mongoose.Schema({
    token: {
        type: String, 
        required: true , 
    }, 
    url_link: {
        type: String, 
        required: true , 
    } , 
    // service_id: {
    //     type: String, 
    // }, 
    quantity : {
        type: String , 
    }, 
    price : {
        type: Number , 
    }, 
    selected_services: {
        type:Array , 
    }, 
    service_name: {
        type: String, 
    }, 
    email: {
        type: String , 
    } , 
    phone: {
        type: String , 
    } , 
    subscription_period : {
        type: String , 
    }, 
    date: {
        type: Date , 
        default: Date.now()
    },
}); 

const Order =  mongoose.model("Order" , schema ); 

module.exports = {
    Order , 
}; 