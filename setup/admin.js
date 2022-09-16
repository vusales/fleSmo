const AdminJS = require('adminjs'); 
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require("@adminjs/mongoose");
AdminJS.registerAdapter(AdminJSMongoose); // or any other adapter
const dBase = require("../models/index");
// ******************
const Connect = require('connect-pg-simple'); 
const session = require('express-session');

const Contstants = require("../constants/index"); 
const DEFAULT_ADMIN = Contstants.DEFAULT_ADMIN ; 

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN);
    }
    return null
}

const setupAdminjs = app => {
    const adminJs = new AdminJS({
        // databases: [],
        resources: dBase ,
        rootPath: "/admin" , // Path to the AdminJS dashboard.       
    });

    // **** new authenticated (mangodb connection string isnt true i gues gives erreset error)****

    // const ConnectSession = Connect(session); 
    // const sessionStore = new ConnectSession({
    //     conObject: {
    //       connectionString: 'mongodb://localhost:27017/fleSmo',
    //       ssl: process.env.NODE_ENV === 'production',
    //     },
    //     tableName: 'session',
    //     createTableIfMissing: true,
    // })

    // const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    //     adminJs,
    //     {
    //       authenticate,
    //       cookieName: 'adminjs',
    //       cookiePassword: 'sessionsecret',
    //     },
    //     null,
    //     {
    //       store: sessionStore,
    //       resave: true,
    //       saveUninitialized: true,
    //       secret: 'sessionsecret',
    //       cookie: {
    //         httpOnly: process.env.NODE_ENV === 'production',
    //         secure: process.env.NODE_ENV === 'production',
    //       },
    //       name: 'adminjs',
    //     }
    // ); 
    // adminJs.watch();
    // app.use(adminJs.options.rootPath, adminRouter);

    // ******************************************************************************************


    // Build and use a router to handle AdminJS routes.
    const router = AdminJSExpress.buildRouter(adminJs);
    adminJs.watch();
    app.use(adminJs.options.rootPath, router);

}

module.exports = setupAdminjs ; 