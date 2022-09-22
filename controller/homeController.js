const Banner =  require("../models/Banner"); 
const InfoCards =  require("../models/InfoCards"); 
const { 
    Subscriptions , 
    SubsModel  
} = require("../models/Subscriptions");
const WhyChooseUs = require("../models/WhyChooseUs"); 
const SiteStatistics =  require("../models/SiteStatistic");

const getHomePageContent = async (req, res) => {
    const banners =  await Banner.find() ; 
    const infoCards = await InfoCards.find(); 
    const subscriptions = await Subscriptions.find(); 
    const whyChooseUs =  await WhyChooseUs.find();
    const statistics =  await SiteStatistics.find();

    res.send({data : {
        banners , 
        infoCards ,
        subscriptions ,
        whyChooseUs ,
        statistics ,
    }});
}

// const sendSubscriptionById = async (req, res) => {
//     const productId =  req.params.id ; 
// const subscriptions =  await Subscriptions.find().populate("subscriptions"); 
//     console.log("subscriptions" , subscriptions );
//     res.send({data : subscriptions });
// }

const getBannerData = async (req , res ) => {
    const banners =  await Banner.find() ; 
    res.send({data : banners });
}

// remove this controller function after all
const seedBannerData = async (req , res) => {
    SiteStatistics.deleteMany();

    SiteStatistics.insertMany([
        { 
            icon: "icon1" , 
            amount: 435463 , 
            description: "smt msjjf"
        }, 
        { 
            icon: "icon2" , 
            amount: 567465 , 
            description: "smt msjjf"
        }, 
        { 
            icon: "icon3" , 
            amount: 4534654 , 
            description: "smt msjjf"
        },
        { 
            icon: "icon3" , 
            amount: 44524, 
            description: "smt msjjf"
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
    // sendSubscriptionById , 
}