const express = require('express');
const {
    getProducts ,  
    seed ,
    getProductOptionsById , 
    filter , 
    getSpecialProducts , 
} =  require("../../controller/productController"); 

const router = express.Router("");

router.get("/" , (req,res)=>getProducts(req , res)); 
router.get("/seed" , (req,res)=>seed(req , res)); 
router.post("/productById" , (req,res)=>getProductOptionsById(req , res)); 
router.post("/filter" , (req,res)=>filter(req , res)); 
router.post("/specialProducts" , (req,res)=>getSpecialProducts(req , res)); 
router.get("/specialProducts" , (req,res)=>getSpecialProducts(req , res)); 

module.exports = router;
