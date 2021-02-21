const maintenanceController = require('./controllers/maintennace.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const OWNER = config.permissionLevels.OWNER;
const FREE = config.permissionLevels.NORMAL;
const baseUrl='/api/maintenance';
exports.routesConfig = function (app) {
    app.get(baseUrl, [
        ValidationMiddleware.validJWTNeeded,
       
        // PermissionMiddleware.minimumPermissionLevelRequired(OWNER),
        maintenanceController.list
    ]);
    app.get(baseUrl+'/:id', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        maintenanceController.getById
    ]);
    app.patch(baseUrl+'/:id', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        maintenanceController.patchById
    ]);
};
