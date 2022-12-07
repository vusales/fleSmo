const {
    UserSchema
} =  require("../models/User") ; 
const registerSchema = require("../validation/RegisterValidation"); 
const loginValidationSchema =  require("../validation/LoginValidation"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUp  = async (req , res ) => {
    // VALIDATE BODY 
    const {error}  = registerSchema.validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message); 

    // CHECKING USER 
    const isEmailExict =  await UserSchema.findOne({email : req.body.email }) ; 
    if(isEmailExict) return res.status(400).send("Email already exists"); 

    // Hash Password 
    const salt =  await bcrypt.genSalt(10);
    const becryptedPassword =  await bcrypt.hash(req.body.password ,  salt); 

    // create new user 
    const user = new UserSchema({
        name: req.body.name , 
        email : req.body.email , 
        password : becryptedPassword
    }); 

    try {
        // if there is no error save user 
        const savedUser =  await user.save(); 
        res.send(savedUser);
    }catch(err){
        res.status(400).send("catch eerr"); 
    }
}

const login = async (req , res ) => {

    // Validate Body 
    const {error} = loginValidationSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    // Check email 
    const user =  await UserSchema.findOne({email : req.body.email }) ; 
    if(!user) return res.status(400).send("Email is wrong");

    const isPasswordTrue = await  bcrypt.compare(req.body.password , user.password ) ; 
    if(!isPasswordTrue) return res.status(400).send("Password is not valid") ; 

    // createing token 

    const token = jwt.sign({id: user._id} , "1122YYY33DDD44YYY" ) ; 

    res.header("WWWFLE-AUTH-TOKEN" , token ).send({
        result: true , 
    });
}


module.exports = {
    signUp , 
    login , 
}