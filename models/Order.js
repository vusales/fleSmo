const mongoose = require("mongoose"); 

const schema =  mongoose.Schema({
    user_id: {
        type: String, 
        required: true , 
    }, 
    url_link: {
        type: String, 
        required: true , 
    } , 
    service_id: {
        type: String, 
        required: true , 
    }, 
    selected_services: {
        type:Array , 
    }, 
    service_name: {
        type: String, 
    }, 
    quantity : {
        type: String , 
        required: true , 
    } , 
    price : {
        type: Number , 
        required: true , 
    } , 
    email: {
        type: String , 
    } , 
    phone: {
        type: String , 
    } , 
    subscription_period : {
        type: String , 
    }, 
}); 

const Order =  mongoose.model("Order" , schema ); 

module.exports = {
    Order , 
}; 