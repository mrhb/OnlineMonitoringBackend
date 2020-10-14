const TrendsController = require('./controllers/trends.controller');
const trendsMockController = require('./controllers/trendsMock.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
const baseUrl='/api/trends';
const mockUrl='/mock/trends';

exports.routesConfig = function (app) {
    // app.post('/trends', [
    //     TrendsController.insert
    // ]);
    app.get(baseUrl, [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        TrendsController.list
    ]);
    // app.get('/trends/:unitId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     TrendsController.getById
    // ]);
    // app.patch('/trends/:unitId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     TrendsController.patchById
    // ]);
    // app.delete('/trends/:unitId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    //     TrendsController.removeById
    // ]);




app.get(mockUrl,[ trendsMockController.getData]);
};