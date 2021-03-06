const unitsController = require('./controllers/units.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const OWNER = config.permissionLevels.OWNER;
const FREE = config.permissionLevels.NORMAL;
const baseUrl='/api/units';
exports.routesConfig = function (app) {
    app.post(baseUrl, [
        unitsController.insert
    ]);
    app.get(baseUrl, [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(OWNER),
        unitsController.list
    ]);
    app.get(baseUrl+'/get-units-by-userId/:userId', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(OWNER),
        unitsController.listFilteredByUser
    ]);

    app.get(baseUrl+'/:unitId', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        unitsController.getById
    ]);
    app.patch(baseUrl+'/:unitId', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        unitsController.patchById
    ]);
    app.delete(baseUrl+'/:unitId', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        unitsController.removeById
    ]);
};
