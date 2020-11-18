const sidebarController = require('./controllers/sidebar.controller');
const sidebarMockController = require('./controllers/sidebarMock.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
const baseUrl='/api/sidebar';
const mockUrl='/mock/sidebar';


exports.routesConfig = function (app) {
    // app.post('/sidebar', [
    //     sidebarController.insert
    // ]);
    app.get(baseUrl, [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        sidebarController.list
    ]); 
    app.post(baseUrl, [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        sidebarController.list
    ]);
    // app.get('/sidebar/:unitId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     sidebarController.getById
    // ]);
    // app.patch('/sidebar/:unitId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    //     PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    //     sidebarController.patchById
    // ]);
    // app.delete('/sidebar/:unitId', [
    //     ValidationMiddleware.validJWTNeeded,
    //     PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    //     sidebarController.removeById
    // ]);




app.get(mockUrl,[ sidebarMockController.getData]);
app.post(mockUrl,[ sidebarMockController.getData]);
};