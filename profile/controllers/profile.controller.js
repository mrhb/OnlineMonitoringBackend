const UserModel = require('../../users/models/users.model');
const crypto = require('crypto');
var path = require('path');
var _ = require('lodash');

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    delete req.body.password
    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.resetPassById = (req, res) => {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update("123456").digest("base64");
        req.body.password = salt + "$" + hash;

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            console.log(result);
           res.status(200).send({});
        });
};

exports.setAvatarById = (req, res) => {


    var file = req.file.filename;
	var matches = file.match(/^(.+?)_.+?\.(.+)$/i);

	if (matches) {
		files = _.map(['sm'], function(size) {
			return matches[1] + '_' + size + '.' + matches[2];
		});
	} else {
		files = [file];
	}

    var avatarPath = path.join(req.file.baseUrl, files[0]).replace(/[\\\/]+/g, '/').replace(/^[\/]+/g, '');

    req.body.avatarPath = avatarPath;
    
    UserModel.patchUser(req.params.userId, req.body)
    .then((result) => {
        console.log(avatarPath);
        res.status(200).send({});
        });
};
