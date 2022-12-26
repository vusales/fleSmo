const cors = require('cors');
// helmet for set header
const helmet = require('helmet');

const configureCors = app => {
    app.set('trust proxy', true);
    app.use(helmet({contentSecurityPolicy: false}));
    app.use(
        cors({
            origin: true,
            credentials: true,
            // exposedHeaders: ['x-w-t-access-token', 'x-w-t-refresh-token'],
            methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
            "Access-Control-Allow-Origin": "*" , 
            "Access-Control-Allow-Headers": "X-Requested-With" , 
        })
    );
};

module.exports = configureCors;