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
    console.log("Connected db") ; 
    setupAdminjs(app); 
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.listen(port , ()=>{console.log("listening on port " + port)}); 
})
.catch(() =>{ 
    console.log("Db connection eror") ; 
    process.exit(1); 
});