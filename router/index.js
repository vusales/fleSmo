const mainRoute =  require("./home/main");
const homeRoute = require("./home/index");
const categoryRoute = require("./category/index");
const productRoute = require("./product/index"); 
const loginSignUp =  require("./loginSignup/index"); 
const order = require("./order/index"); 

const applyRoutes = app => {
    // app.all('/', function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     next();
    // });

    /** Home public */
    app.use("" , mainRoute);

    // i will remove this after connected home to front
    app.use('/api/home', homeRoute );

    // Catalogs
    app.use('/api/catalog', categoryRoute );

    // Products 
    app.use("/api/products" , productRoute ); 

    // LoginSignUp 
    app.use("/api/auth" , loginSignUp); 

    // Order 
    app.use("/api/order" , order ); 
    
};

module.exports = applyRoutes;