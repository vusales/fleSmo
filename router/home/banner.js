const express = require('express');
const {getBannerData ,  seedBannerData } =  require("../../controller/bannerController");
const router = express.Router();

router.get("/seed", (req , res) => seedBannerData(req , res) );
router.get("/banner" , (req , res) => getBannerData(req , res) ); 

module.exports = router;


