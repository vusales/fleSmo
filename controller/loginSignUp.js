const {
    UserSchema
} =  require("../models/User") ; 


const signUp  = (req , res ) => {
    res.send("signUp"); 
}

const login = (req , res ) => {
    res.send("login"); 
}


module.exports = {
    signUp , 
    login , 
}