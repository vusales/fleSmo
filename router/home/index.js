const express = require('express');
const { 
    getBannerData ,  
    seedBannerData , 
    getHomePageContent , 
    getInfoContainersData , 
    // sendSubscriptionById  
} =  require("../../controller/homeController");
const router = express.Router("");


// base api for Home page
router.get("/home" , (req , res) => getHomePageContent(req , res) ); 

// send subscripted product by id 
// router.post("/subscriptions/:id" , (req , res) => sendSubscriptionById(req , res) ); 

// apis for Home page 
router.get("/seed", (req , res) => seedBannerData(req , res) );
router.get("/banner" , (req , res) => getBannerData(req , res) );


module.exports = router;