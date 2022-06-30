const sidebarController = require('./controllers/sidebar.controller');
const sidebarMockController = require('./controllers/sidebarMock.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const OWNER = config.permissionLevels.OWNER;
const FREE = config.permissionLevels.NORMAL;
const baseUrl='/api/sidebar';
const mockUrl='/mock/sidebar';


exports.routesConfig = function (app) {
    app.get(baseUrl, [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(OWNER),
        sidebarController.list
    ]); 
    app.post(baseUrl, [
        ValidationMiddleware.validJWTNeeded,
      
        // PermissionMiddleware.minimumPermissionLevelRequired(OWNER),
        sidebarController.unitsStatus
    ]);
   
    app.get(baseUrl +'/get-details-by-unitId/:unitId', [
       // ValidationMiddleware.validJWTNeeded,
      
        // PermissionMiddleware.minimumPermissionLevelRequired(OWNER),
        sidebarController.unitDetails
    ]);
    app.get(mockUrl,[ sidebarMockController.getData]);
    app.post(mockUrl,[ sidebarMockController.getData]);
};