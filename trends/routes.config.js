const TrendsController = require('./controllers/trends.controller');
const trendsMockController = require('./controllers/trendsMock.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const OWNER = config.permissionLevels.OWNER;
const FREE = config.permissionLevels.NORMAL_USER;
const baseUrl='/api/trends';
const mockUrl='/mock/trends';

exports.routesConfig = function (app) {
    // app.post('/trends', [
    //     TrendsController.insert
    // ]);
    app.get(baseUrl, [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(OWNER),
        TrendsController.list
    ]); 
    app.post(baseUrl, [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(OWNER),
        TrendsController.list
    ]);
app.get(mockUrl,[ trendsMockController.getData]);
app.post(mockUrl,[ trendsMockController.getData]);
};