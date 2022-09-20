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
//     const subscriptions =  await Subscriptions.find().populate({
//        ref: SubsModel ,
//        match: { _id: productId } ,
//        strictPopulate: true ,
//     }); 
//     console.log("subscriptions" , subscriptions );
//     res.send({data : subscriptions });
// }

const getBannerData = async (req , res ) => {
    const banners =  await Banner.find() ; 
    res.send({data : banners });
}

// remove this controller function after all
const seedBannerData = async (req , res) => {
    // Banner.deleteMany();
    // Banner.insertMany([
    //     { 
    //         intro: "Automatic system", 
    //         title : "Instagram promotion" , 
    //         subTitle : "We have been working since 2013 throughout Russia and the CIS!" , 
    //         description : "Since 2013, the SMOSERVICE team has been promoting projects on one of the most popular online platforms in the world! For customers who order promotion not for the first time, we offer a reward system that helps not only save money, but also get more and more benefits. If you are looking for a reliable artist, planning to promote your Instagram safely and effectively, our services are for you!." , 
    //         buttons : [
    //             {
    //                 title: "Instagram promotion" , 
    //                 link: "/"
    //             }, 
    //             {
    //                 title: "Checkout" , 
    //                 link: "/"
    //             }, 
    //         ] , 
    //         image: "" 
    //     }, 
    // ]);

    // SubsModel.insertMany([
    //     {
    //         icon: "smth" , 
    //         title: "Instagram" , 
    //         image: "jhgshd" , 
    //         promotionMethod: "bhdgash" , 
    //         subscriptionsSettings : {} ,
    //         forEachNewPost: [] , 
    //         perPeriodPerPage: [] ,
    //     }, 
    // ]); 

    SiteStatistics.insertMany([
        { 
            icon: "icon1" , 
            amount: 5 , 
            description: "smt msjjf"
        }, 
        { 
            icon: "icon2" , 
            amount: 5 , 
            description: "smt msjjf"
        }, 
        { 
            icon: "icon3" , 
            amount: 5 , 
            description: "smt msjjf"
        },
        { 
            icon: "icon3" , 
            amount: 5 , 
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