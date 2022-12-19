const {Order}  = require("../models/Order") ; 
const {UserSchema} = require("../models/User") ;


const order = async (req , res ) => {

    res.send("OK BRO "); 

}

module.exports = {
    order , 
}
 

