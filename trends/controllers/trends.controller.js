//const UserModel = require('../models/users.model');
const TrendModel = require('../models/trends.model');
const crypto = require('crypto');

// exports.insert = (req, res) => {
//     let salt = crypto.randomBytes(16).toString('base64');
//     let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
//     req.body.password = salt + "$" + hash;
//     req.body.permissionLevel = 1;
//     UserModel.createUser(req.body)
//         .then((result) => {
//             res.status(201).send({id: result._id});
//         });

// };

exports.list = (req, res) => {

    TrendModel.ReadTrends(req.body) .then((result) => {
        res.status(200).send(result);
    })

};

// exports.getById = (req, res) => {
//     UserModel.findById(req.params.userId)
//         .then((result) => {
//             res.status(200).send(result);
//         });
// };
// exports.patchById = (req, res) => {
//     if (req.body.password) {
//         let salt = crypto.randomBytes(16).toString('base64');
//         let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
//         req.body.password = salt + "$" + hash;
//     }

//     UserModel.patchUser(req.params.userId, req.body)
//         .then((result) => {
//             res.status(204).send({});
//         });

// };

// exports.removeById = (req, res) => {
//     UserModel.removeById(req.params.userId)
//         .then((result)=>{
//             res.status(204).send({});
//         });
// };