const {
    UserSchema
} =  require("../models/User") ; 
const registerSchema = require("../validation/RegisterValidation"); 
const loginValidationSchema =  require("../validation/LoginValidation"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


const signUp  = async (req , res ) => {
    // VALIDATE BODY 
    const {error}  = registerSchema.validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message); 

    // CHECKING USER 
    const isEmailExict =  await UserSchema.findOne({email : req.body.email }) ; 
    if(isEmailExict) return res.status(400).send("Email already exists"); 

    // CHECk PHONE 
    const isPhoneExict =  await UserSchema.findOne({phone : req.body.phone }); 
    if(isPhoneExict) return res.status(400).send("Phone already exists"); 


    // Hash Password 
    const salt =  await bcrypt.genSalt(10);
    const becryptedPassword =  await bcrypt.hash(req.body.password ,  salt); 

    // create new user 
    const user = new UserSchema({
        name: req.body.name , 
        email : req.body.email , 
        password : becryptedPassword , 
        surname: req.body.surname , 
        phone :  req.body.phone , 
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
    // const user =  await UserSchema.findOne({email : req.body.email }) ; 
    // if(!user) return res.status(400).send("Email is wrong");

    // CHECk PHONE 
    const user =  await UserSchema.findOne({phone : req.body.phone }); 
    if(!user) return res.status(400).send("Phone already exists"); 

    const isPasswordTrue = await  bcrypt.compare(req.body.password , user.password ) ; 
    if(!isPasswordTrue) return res.status(400).send("Password is not valid") ; 

    // createing token 
    const token = jwt.sign({id: user._id} , "1122YYY33DDD44YYY" ) ; 
    await UserSchema.updateOne({phone : req.body.phone } , {authToken : token }); 

    res.header("WWWFLE-AUTH-TOKEN" , token ).send({
        result: true , 
        auth_token: token 
    });
}

const signOut = async (req , res) => {
    let user =  UserSchema.findOne({authToken : req.body.token }); 
    if(!user) return res.status(400).send("Gondərilən məlumat düzgün deyil!") ; 

    await UserSchema.updateOne({authToken : req.body.token } , {authToken : null }); 
    res.status(200).send({
        result: true , 
    });
}

const checkEmail = async (req , res) => {
    const { email ,  token } = req.body; 
    // check body 
    if(!email || !token ) return res.status(400).send("istifadəçi məlumatları düzgen deyil!"); 
    // check email 
    const isEmailTrue =  await UserSchema.find({email: email}) ; 
    if(!isEmailTrue ) return res.status(400).send("Istifadəçi məlumatları yanışdır!");

    let OtpCode =  Math.floor(1000 + Math.random() * 9000).toString() ; 
    // Hash OtpCode 
    const salt =  await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash( OtpCode ,  salt); 
    // // write hashed otp to dataBase
    await UserSchema.updateOne({email: email } ,  {hashedOtp : hashedOTP }); 

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user: "sahibakbarr1@gmail.com" ,
            pass: "mnuznfqotrtevvxa",
        }
    };
    let transporter = nodemailer.createTransport(smtpConfig);

    transporter.sendMail(
    {
        from: 'sahibakbarr1@gmail.com', // sender address
        // to: `${email}`, // list of receivers
        to: "vusale.safarova95@mail.ru", // list of receivers
        subject: "FLESMO OTP VERIFICATION CODE", // Subject line
        //text: "OtpCode", // plain text body
        html: `<b style="font-size:30px ; line-height:64px; text-align:center;">${OtpCode}</b>`, // html body
    },
    (err , data) => {
        if (err) return console.log("err" , err );
        if(data) {
            res.send(`${data.messageId}`); 
        }
    });
}

const veriFyCode = async (req , res ) => {
    const {code , token } = req.body ; 
    if( !code || !token ) return  res.status(400).send("Təsdiqləmə kodu düzgün deyil!");
    const user = await UserSchema.findOne({authToken: token }); 
    const iscodeTrue = bcrypt.compare(code, user?.hashedOtp).then((result) => {
        if(result){
            res.status(200).send({
                result: true ,
            }); 
        }else {
            res.status(400).json({
                result: false, 
            }); 
        }
    }); 
}

const changePassword =  async(req , res) => {
    console.log("req" ,  req );
    const {password ,  token } = req.body ; 
    if(!password) return res.status(400).send("İstifadəçi məlumatları düzgün deyil!"); 

    // Hash Password 
    const salt =  await bcrypt.genSalt(10);
    const becryptedPassword =  await bcrypt.hash( password ,  salt ); 
    
    // update password
    await UserSchema.updateOne({authToken: token } , {password: becryptedPassword }); 

    res.status(200).send({
        result: true
    }); 
}


module.exports = {
    signUp , 
    login , 
    signOut ,
    checkEmail , 
    veriFyCode , 
    changePassword , 
}