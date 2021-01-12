const groupsController = require('./controllers/groups.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.OWNER;
const FREE = config.permissionLevels.NORMAL_USER;
const baseUrl='/api/groups';
exports.routesConfig = function (app) {
    app.post(baseUrl, [
        groupsController.insert
    ]);
    app.get(baseUrl, [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        groupsController.list
    ]);
    app.get(baseUrl+'/:id', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        groupsController.getById
    ]);
    app.patch(baseUrl+'/:id', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        groupsController.patchById
    ]);
    app.delete(baseUrl+'/:id', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        groupsController.removeById
    ]);
};
