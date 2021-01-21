const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
const AuthValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');

const config = require('../common/config/env.config');


const ADMIN = config.permissionLevels.ADMIN;
const OWNER = config.permissionLevels.OWNER;
const FREE = config.permissionLevels.NORMAL;

const baseUrl='/auth';
exports.routesConfig = function (app) {

    app.post(baseUrl, [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);
    app.get(baseUrl+'/owners', [
        // AuthValidationMiddleware.validJWTNeeded,
        VerifyUserMiddleware.getOwners
    ]);
    app.post(baseUrl+'/setOwnerId', [
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        VerifyUserMiddleware.isOwnerIdValid,
        AuthorizationController.login
    ]);

    app.post(baseUrl+'/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]);
};