const unitModel = require('../models/units.model');
// const crypto = require('crypto');

exports.insert = (req, res) => {
    // let salt = crypto.randomBytes(16).toString('base64');
    // let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    // req.body.password = salt + "$" + hash;
    // req.body.permissionLevel = 1;
    unitModel.createUnit(req.body)  .then((result) => {
        res.status(201).send({id: result._id});
    });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 50;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    unitModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};


exports.listFilteredByUser = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    unitModel.userUnits(req.params.userId,limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    unitModel.findById(req.params.unitId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    // if (req.body.password) {
    //     let salt = crypto.randomBytes(16).toString('base64');
    //     let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    //     req.body.password = salt + "$" + hash;
    // }

    unitModel.patchunit(req.params.unitId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    unitModel.removeById(req.params.unitId)
        .then((result)=>{
            res.status(204).send({});
        });
};