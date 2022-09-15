const bodyParser = require('body-parser');
const applyRoutes = require('../router/index');

const setupRoutes = app => {

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    
    // parse application/json
    app.use(bodyParser.json());

    // routes
    applyRoutes(app);
};

module.exports = setupRoutes;
