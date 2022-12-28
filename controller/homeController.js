const Banner =  require("../models/Banner"); 
const InfoCards =  require("../models/InfoCards"); 
const { 
    // Subscriptions , 
    // SubsModel  , 
    SubscriptionsMainSchemaModel , 
    SubscriptionTypesModel ,  
    SubscriptionServicessModel ,
    ServicessValuesModel ,
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
    const subscriptions = await SubscriptionsMainSchemaModel.find({}).populate({
        path: "subscriptions",
        populate: {
            path: "servicess" , 
            populate: { path: "service_values" }
        }
    }).exec(); 
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
    const pagesIntro = await PagesIntroModel.find({}).populate({
        path: "pageContent" ,
        populate : {
            path : "characteristicCards"
        }
    }).exec();

    res.send({
        data : {
            banners :  pagesIntro , 
        }
    }); 
}

const createPagesIntro = async () => {
    const characteristic =  new CharacteristicCardsModel({
        icon: "" , 
        title: "Conclusion in the TOP by search, increasing the chance of getting into trends and recommended ones." ,
    });
   
    // const introPage = new PagesIntroModel({
    //     pageName: "Big brands" , 
    //     pageContent : {
    //         intro: "Need clients and subscribers?" , 
    //         title: "Business promotion in social networks" , 
    //         bannerDescription : `We will think over a strategy, draw up a page promotion plan and ensure a constant flow of customers, this is to attract new subscribers and increase popularity by reaching the target audience.
    //         Increasing brand awareness, proper advertising, comprehensive services to increase views, likes and subscribers!` , 
    //         image: "" ,
    //         characteristicCards :  [] ,
    //     } 
    // }); 

    // characteristic.save() ; 
    // introPage.pageContent.characteristicCards.addToSet(characteristic); 
    // introPage.save();

    PagesIntroModel.findById("637ccae62d4de1235a88079d" , function (err ,  findedItem ) {
        if(err) console.log("err" , err);
        findedItem.pageContent.characteristicCards.push(characteristic);
        findedItem.save(function(err){if(err)return}) ; 
    }) ; 
}

const createSubscriptions = async () => {
    // const subscription  = new SubscriptionsMainSchemaModel({
    //     price : 1000 , 
    //     title: "Service Subscription", 
    //     subTitle: "Pay less, get more!" ,  
    //     description: "Subscriptions are the best way to promote and promote your social media accounts. Promotion in social networks by subscription is an opportunity to show your activities and quickly attract a target audience that is ready to take real actions. We guarantee the fulfillment of even the largest order.Bonuses are offered for new customers who place large orders. When you contact us on an ongoing basis, you are guaranteed to receive discounts. We provide promotion services based on the use of white methods. You do not risk by contacting us." , 
    //     subscriptions: [] , 
    // }); 
    const subscriptionsTypes = new SubscriptionTypesModel({
        icon: "" , 
        title: "TikTok", 
        image: "" , 
        promotionMethod: "As soon as you add a new post to your Instagram account, our online su…" , 
        servicess: [] ,
    });

    const servicess = SubscriptionServicessModel({
        service_title: "FOR EACH NEW POST" , 
        service_values : [] , 
    }); 

    const values = ServicessValuesModel({
        title: "Likes" ,
        itemPrice: 0.10 , 
        currency: "AZN" , 
        incrementValues: [300 , 400 , 500 , 600 ] ,
        amount: 0 , 
    });

    values.save(function(err){
        if(err) console.log("subsub err" , err) ; 
    });
    servicess.service_values.push(values) ; 

    servicess.save(function(err){
        if(err) console.log("subsub err" , err) ; 
    });

    subscriptionsTypes.servicess.push(servicess); 

    subscriptionsTypes.save(function(err){
        if(err) console.log("subsub err" , err) ; 
    });

    await SubscriptionsMainSchemaModel({_id: "SubscriptionsMainSchemaModel"} , { subscriptions : subscriptionsTypes }); 
    // subscription.subscriptions.push(subscriptionsTypes); 
    // subscription.save(function (err) {
    //     if (err) return handleError("subs err" , err);
    //     // that's it!
    // });
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

const sendSubscriptionById =  async (req , res) => {
    const {id} =  req.body ; 
    if(!id) return res.status(400).send("İstifadəçi məlumtları düzgün deyil!");
    const resultData =  await SubscriptionTypesModel.findById(id).populate({
        path: "servicess" , 
        populate: { path: "service_values" }
    });
    res.status(200).send({
        data: resultData , 
    });
}

module.exports = {
    getHomePageContent ,
    getBannerData , 
    seedBannerData ,
    getInfoContainersData ,
    sendPagesIntro , 
    sendSubscriptionById , 
}