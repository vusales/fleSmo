const mainRoute =  require("./home/main");
const bannerRoute =  require("./home/banner"); 

const applyRoutes = app => {
    /** Home public */
    app.use("" , mainRoute);
    app.use('/api/home', bannerRoute);
};

module.exports = applyRoutes;