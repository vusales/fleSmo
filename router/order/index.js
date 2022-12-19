const express = require('express');
const router = express.Router();
const {order, } =  require("../../controller/orderController");


router.post("/" ,  (req , res) => order(req , res)); 


module.exports = router;