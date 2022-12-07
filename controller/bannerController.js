const Banner =  require("../models/Banner"); 

const getBannerData = async (req , res ) => {
    const banners =  await Banner.find() ; 
    res.send({data : banners });
}

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

module.exports = {
    getBannerData , 
    seedBannerData,
}