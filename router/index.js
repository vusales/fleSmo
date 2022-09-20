const mainRoute =  require("./home/main");
const homeRoute = require("./home/index");
const catalogRoute = require("./catalog/index");

const applyRoutes = app => {
    /** Home public */
    app.use("" , mainRoute);
    // i will remove this after connected home to front
    app.use('/api/home', homeRoute);
    // Catalogs
    app.use('/api/catalog', catalogRoute);
};

module.exports = applyRoutes;