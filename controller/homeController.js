const Banner =  require("../models/Banner"); 
const InfoCards =  require("../models/InfoCards"); 
const { 
    Subscriptions , 
    SubsModel  , 
    SubsForEachNewPostModel ,
    SubsPerPeriodPerPageModel ,  
    SubsSettingsModel ,
} = require("../models/Subscriptions");
const WhyChooseUs = require("../models/WhyChooseUs"); 
const SiteStatistics =  require("../models/SiteStatistic");
const {
    PagesIntroModel , 
    CharacteristicCardsModel ,
} =  require("../models/PagesIntro"); 
const {
    Product
} = require("../models/Products"); 

const getHomePageContent = async (req, res) => {
    // createSubscriptions(); 
    const banners =  await Banner.find(); 
    const infoCards = await InfoCards.find(); 
    const subscriptions = await Subscriptions.find({}).populate("subscriptions").exec(); 
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

const sendPagesIntro = async (req, res) => {
    // createPagesIntro(); 
    const pagesIntro = await PagesIntroModel.find({}).populate("pageContent.characteristicCards").exec();
 
    res.send({
        data : {
            banners :  pagesIntro , 
        }
    }); 
}

const createPagesIntro = async () => {
    const characteristic =  new CharacteristicCardsModel({
        icon: "" , 
        title: "Audit and detailed analysis of the project, preparation of personal recommendations." ,
    });
   
    const introPage = new PagesIntroModel({
        pageName: "Big brands" , 
        pageContent : {
            intro: "Need clients and subscribers?" , 
            title: "Business promotion in social networks" , 
            bannerDescription : `We will think over a strategy, draw up a page promotion plan and ensure a constant flow of customers, this is to attract new subscribers and increase popularity by reaching the target audience.
            Increasing brand awareness, proper advertising, comprehensive services to increase views, likes and subscribers!` , 
            image: "" ,
            characteristicCards :  [] ,
        } 
    }); 

    characteristic.save() ; 
    introPage.pageContent.characteristicCards.addToSet(characteristic); 
    introPage.save();
}

const createSubscriptions = async () => {
    const subscription  = new Subscriptions({
        price : 1000 , 
        title: "Service Subscription", 
        subTitle: "Pay less, get more!" ,  
        description: "Subscriptions are the best way to promote and promote your social media accounts. Promotion in social networks by subscription is an opportunity to show your activities and quickly attract a target audience that is ready to take real actions. We guarantee the fulfillment of even the largest order.Bonuses are offered for new customers who place large orders. When you contact us on an ongoing basis, you are guaranteed to receive discounts. We provide promotion services based on the use of white methods. You do not risk by contacting us." , 
        subscriptions: [] , 
    }); 
    const subsub = new SubsModel({
        icon: "" , 
        title: "Instagram", 
        image: "" , 
        promotionMethod: "As soon as you add a new post to your Instagram account, our online su…" , 
        subscriptionsSettings : {
            defaultPostForPeriod: 100 , 
            repeatTaskPerDay: [10, 100 , 150 ] , 
        } ,
        forEachNewPost: [{
            title:"perPost" , 
            price: 2000 , 
            currency: "manat" , 
            amount: 10 , 
            incrementStep: 10 , 
        }] , 
        perPeriodPerPage: [{
            title:"perPage" , 
            price: 3000 , 
            currency: "manat" , 
            amount: 50 , 
            incrementStep: 15 , 
        }] , 
    });

    subsub.save(function(err){
        if(err) console.log("subsub err" , err) ; 
    });

    subscription.subscriptions.push(subsub); 
    subscription.save(function (err) {
        if (err) return handleError("subs err" , err);
        // that's it!
    });
}

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
    sendPagesIntro , 
}