const mainRoute =  require("./home/main");
const homeRoute = require("./home/index");

const applyRoutes = app => {
    /** Home public */
    app.use("" , mainRoute);
    // i will remove this after connected home to front
    app.use('/api/home', homeRoute);
};

module.exports = applyRoutes;