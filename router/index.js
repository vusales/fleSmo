const mainRoute =  require("./home/main");
const homeRoute = require("./home/index");
const categoryRoute = require("./category/index");
const productRoute = require("./product/index"); 

const applyRoutes = app => {
    /** Home public */
    app.use("" , mainRoute);
    // i will remove this after connected home to front
    app.use('/api/home', homeRoute );
    // Catalogs
    app.use('/api/catalog', categoryRoute );
    // Products 
    app.use("/api/products" , productRoute ); 
};

module.exports = applyRoutes;