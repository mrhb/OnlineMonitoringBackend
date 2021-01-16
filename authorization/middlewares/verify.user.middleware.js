const UserModel = require('../../users/models/users.model');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findByEmail(req.body.email)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({});
            }else{
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user[0]._id,
                        ownerId:user[0]._id,
                        email: user[0].email,
                        permissionLevel: user[0].permissionLevel,
                        provider: 'email',
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        });
};

exports.isOwnerIdValid = (req, res, next) => {
    UserModel.findById(req.body.ownerId)
        .then((user)=>{
            if(!user){
                res.status(404).send({});
            }else{
                req.body=req.jwt;
                    req.body.ownerId=user.id;

                    req.body = {
                        userId: req.jwt.userId,
                        ownerId:user.id,
                        email: req.jwt.email,
                        permissionLevel: req.jwt.permissionLevel,
                        provider: 'email',
                        firstName:req.jwt.firstName,
                        lastName: req.jwt.lastName,
                    };
                    return next();
            }
        });
};