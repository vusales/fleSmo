const Joi = require("joi");

let pattern  =  /^[0-9]{9}$/ ; 

const loginValidation =  Joi.object({
    email: Joi.string().min(6).email() , 
    phone: Joi.string().regex(pattern).required(), 
    password: Joi.string().min(6).required() ,
}); 

module.exports = loginValidation ; 