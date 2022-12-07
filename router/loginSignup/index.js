const express = require('express');
const router = express.Router();
const {
    signUp , 
    login ,
} =  require("../../controller/loginSignUp") ; 


router.post("/login", (req , res) => login(req , res) );
router.post("/register", (req , res) => signUp(req , res) );


module.exports = router;