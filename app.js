const express = require('express');
const routeSetup = require("./setup/routes"); 
const databaseSetup = require("./setup/db"); 
const corsSetup = require("./setup/cors"); 
// new addinjs admin
const AdminJS = require('adminjs'); 
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require("@adminjs/mongoose");
AdminJS.registerAdapter(AdminJSMongoose);
const dBase = require("./models/index");
// ******************


// Port
let port = process.env.PORT || 3002 ; 

const app = express();

corsSetup(app);
routeSetup(app);
databaseSetup(app)
.then(()=>{
    console.log("Connected db") ; 

    //  ADMINJS.
    const adminJs = new AdminJS({
        // databases: [], // We don’t have any resources connected yet.
        resources: dBase ,
        rootPath: "/admin" , // Path to the AdminJS dashboard.
    });
    // Build and use a router to handle AdminJS routes.
    const router = AdminJSExpress.buildRouter(adminJs);
    app.use(adminJs.options.rootPath, router);
    //***********************************************


    app.listen(port , ()=>{console.log("listening on port " + port)}); 
})
.catch(() =>{ 
    console.log("Db connection eror") ; 
    process.exit(1); 
});


