const mongoose = require("mongoose"); 

const userSchmema  =  new mongoose.Schema({
    name: {
        type: String , 
        required: true , 
        min: 2 , 
        max : 255 
    }, 
    email: {
        type: String , 
        required: true , 
        max:255 , 
        min: 2 
    } , 
    password : {
        type: String , 
        required: true , 
        max: 1024 , 
        min: 8 , 
    } , 
    date: {
        type: Date , 
        default: Date.now()
    } , 
    authToken : {
        type: String , 
        min: 2 , 
        max : 255 , 
    } ,
    hashedOtp : {
        type: String , 
        min: 2 , 
        max : 255 , 
    },
    orders: [{type: mongoose.Schema.Types.ObjectId , ref: "Order" }], 
    verified : Boolean , 
});

const UserSchema =  mongoose.model("User" , userSchmema ); 

module.exports = {
    UserSchema , 
}; 
