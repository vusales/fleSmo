const express = require('express');
const { 
    getCategoryData ,   
} =  require("../../controller/categoryController");
const router = express.Router("");

router.get("/" , (req , res) => getCategoryData(req , res));

module.exports = router;
