var express = require('express');

const ProfileController = require('./controllers/profile.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');


require('dotenv').config();
var avatar = require('./avatars');


const ADMIN = config.permissionLevels.ADMIN;
const OWNER = config.permissionLevels.OWNER;
const FREE = config.permissionLevels.NORMAL;
const baseUrl='/api/profile';
exports.routesConfig = function (app) {


    app.get(baseUrl+'/:userId', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
       ProfileController.getById
    ]);
    app.patch(baseUrl+'/:userId', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProfileController.patchById
    ]);
    app.patch(baseUrl+'/reset-pass/:userId', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProfileController.resetPassById
    ]);
    app.post(baseUrl+'/set-avatar/:userId', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        avatar.upload.single(process.env.AVATAR_FIELD),
        ProfileController.setAvatarById
    ]);
};
