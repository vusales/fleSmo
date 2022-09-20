const express = require('express');
const { 
    getCatalogData ,   
} =  require("../../controller/catalogController");
const router = express.Router("");

router.get("/" , (req , res) => getCatalogData(req , res) );

module.exports = router;
