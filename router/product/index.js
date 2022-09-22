const express = require('express');
const {
    getProducts ,  
    seed ,
    getProductOptionsById , 
} =  require("../../controller/productController"); 

const router = express.Router("");

router.get("/" , (req,res)=>getProducts(req , res)); 
router.get("/seed" , (req,res)=>seed(req , res)); 
router.post("/productById" , (req,res)=>getProductOptionsById(req , res)); 

module.exports = router;
