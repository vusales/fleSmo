const mongoose = require("mongoose"); 

const selectedServiceSchema = mongoose.Schema({
    service_id: {
        type: String , 
    }, 
    currency: {
        type: String , 
    },
    price: {
        type: Number , 
    },
    quantity: {
        type: Number , 
    },
}); 

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
    selected_services: [ { type: mongoose.Schema.Types.ObjectId , ref: "SelectedServicess" } ], 
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
        default: Date.now
    },
}); 

const Order =  mongoose.model("Order" , schema ); 
const SelectedServicess =  mongoose.model("SelectedServicess"  ,  selectedServiceSchema ); 

module.exports = {
    Order , 
    SelectedServicess , 
}; 