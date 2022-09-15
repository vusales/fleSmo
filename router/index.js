const bannerRoute =  require("./home/banner"); 



const applyRoutes = app => {
    /** Home public */
    app.use('/api/home', bannerRoute);

};

module.exports = applyRoutes;