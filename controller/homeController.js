const Banner =  require("../models/Banner"); 
const InfoCards =  require("../models/InfoCards"); 
const Subscriptions = require("../models/Subscriptions");


const getHomePageContent = async (req, res) => {
    const banners =  await Banner.find() ; 
    const infoCards = await InfoCards.find(); 
    const subscriptions = await Subscriptions.find(); 

    res.send({data : {
        banners , 
        infoCards ,
        subscriptions ,
    }});
}

const getBannerData = async (req , res ) => {
    const banners =  await Banner.find() ; 
    res.send({data : banners });
}

// remove this controller function after all
const seedBannerData = async (req , res) => {
    Banner.deleteMany();
    Banner.insertMany([
        { 
            intro: "Automatic system", 
            title : "Instagram promotion" , 
            subTitle : "We have been working since 2013 throughout Russia and the CIS!" , 
            description : "Since 2013, the SMOSERVICE team has been promoting projects on one of the most popular online platforms in the world! For customers who order promotion not for the first time, we offer a reward system that helps not only save money, but also get more and more benefits. If you are looking for a reliable artist, planning to promote your Instagram safely and effectively, our services are for you!." , 
            buttons : [
                {
                    title: "Instagram promotion" , 
                    link: "/"
                }, 
                {
                    title: "Checkout" , 
                    link: "/"
                }, 
            ] , 
            image: "" 
        }, 
    ]);
    res.send("Ok");
}

const getInfoContainersData = async (req , res ) => {
    const info =  await InfoCards.find() ; 
    res.send({data : info });
}

module.exports = {
    getHomePageContent ,
    getBannerData , 
    seedBannerData,
    getInfoContainersData ,
}