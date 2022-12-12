const Joi = require("joi");

let pattern  =  /^[0-9]{9}$/ ; 

const registerSchema = Joi.object({
    name: Joi.string().min(2).required(), 
    surname: Joi.string().min(2).required(), 
    email: Joi.string().min(6).email(),
    // phone: Joi.string().pattern(/(\+\d{2}\s?)?((\(\d{3}\)\s?)|(\d{2})(\s|-?))(\d{2}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g).required(), 
    phone: Joi.string().regex(pattern).required(), 
    password: Joi.string().min(6).required(),
}); 

module.exports = registerSchema ; 