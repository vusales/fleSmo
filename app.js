
const express = require('express');
const routeSetup = require("./setup/routes"); 
const databaseSetup = require("./setup/db"); 
const corsSetup = require("./setup/cors"); 
var path = require('path');

// new addinjs admin
const AdminJS = require('adminjs'); 
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require("@adminjs/mongoose");
AdminJS.registerAdapter(AdminJSMongoose); // or any other adapter
const dBase = require("./models/index");
const { crossOriginResourcePolicy } = require('helmet');
// ******************


// Port
let port = process.env.PORT || 3002 ; 
const app = express();

corsSetup(app);
routeSetup(app);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
databaseSetup(app)
.then(()=>{
    console.log("Connected db") ; 

    //  ADMINJS.
    const adminJs = new AdminJS({
        // databases: [],
        resources: dBase ,
        rootPath: "/admin" , // Path to the AdminJS dashboard.       
    });
    // Build and use a router to handle AdminJS routes.
    const router = AdminJSExpress.buildRouter(adminJs);
    adminJs.watch();
    app.use(adminJs.options.rootPath, router);
    //***********************************************
    app.listen(port , ()=>{console.log("listening on port " + port)}); 
})
.catch(() =>{ 
    console.log("Db connection eror") ; 
    process.exit(1); 
});


