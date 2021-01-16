const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
const AuthValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

const baseUrl='/auth';
exports.routesConfig = function (app) {

    app.post(baseUrl, [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);
    app.post(baseUrl+'/serOwnerId', [
        AuthValidationMiddleware.validJWTNeeded,
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