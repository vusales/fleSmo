const express = require('express');
const routeSetup = require("./setup/routes"); 
const databaseSetup = require("./setup/db"); 
const corsSetup = require("./setup/cors"); 
var path = require('path');
const setupAdminjs = require("./setup/admin");

// Port
let port = process.env.PORT || 3002 ; 
const app = express();

corsSetup(app);
routeSetup(app);
databaseSetup(app)
.then(()=>{
    setupAdminjs(app); 
    app.use(express.static('public'));
    app.use("/images" , express.static('images'));
    app.listen(port , ()=>{console.log("listening on port " + port)}); 
})
.catch((err) =>{ 
    console.log("Db connection eror", err) ; 
    process.exit(1); 
});