const jwtSecret = require('../../common/config/env.config.js').jwt_secret,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({
            accessToken: token, 
            refreshToken: refresh_token,
            id: req.body.userId,
            ownerId: req.body.ownerId,
            firstName:  req.body.firstName,
            lastName: req.body.lastName,
            username:req.body.email,
            permissionLevel:req.body.permissionLevel,
            avatarPath:req.body.avatarPath,
            token: token
        });
    } catch (err) {
        res.status(500).send({errors: err});
    }
};



exports.signup = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({
            accessToken: token, 
            refreshToken: refresh_token,
            id: req.body.userId,
            firstName:  req.body.firstName,
            lastName: req.body.lastName,
            username:req.body.email,
            token: token
        });
    } catch (err) {
        res.status(500).send({errors: err});
    }
};
exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};


exports.getOwners = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({
            accessToken: token, 
            refreshToken: refresh_token,
            id: req.body.userId,
            ownerId: req.body.ownerId,
            firstName:  req.body.firstName,
            lastName: req.body.lastName,
            username:req.body.email,
            permissionLevel:req.body.permissionLevel,
            token: token
        });
    } catch (err) {
        res.status(500).send({errors: err});
    }
};