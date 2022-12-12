const express = require('express');
const router = express.Router();
const {
    signUp , 
    login ,
    signOut , 
    checkEmail ,  
    veriFyCode , 
    changePassword , 
} =  require("../../controller/loginSignUp") ; 

router.post("/login", (req , res) => login(req , res) );
router.post("/register", (req , res) => signUp(req , res) );
router.post("/signOut" , (req , res) => signOut(req , res) ) ;
router.post("/checkEmail" , (req , res) => checkEmail(req , res) ) ;
router.post("/codeVerify" , (req , res) => veriFyCode(req , res) ) ;
router.post("/newPassword" , (req , res) => changePassword(req , res) ) ;


module.exports = router;