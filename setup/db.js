const mongoose = require('mongoose');
const winston = require('winston');

const setupDbConnection = () => {
    
    return new Promise((resolve, reject) => {
    
        let dbAddr = "mongodb://127.0.0.1:27017/fleSmo"  ;
       
        mongoose
        .connect(dbAddr, {
            keepAlive: true,
            keepAliveInitialDelay: 300000,
            serverSelectionTimeoutMS: 5000, // 5 sec
            socketTimeoutMS: 300000, // 5 min
            // useCreateIndex: true,
            // useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            winston.info('Connected to DB...');
            resolve();
        })
        .catch((err) => {
            winston.error(`Error connecting to db ${err}`)
        })
    });
};

module.exports = setupDbConnection;