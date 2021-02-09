var express = require('express');
var router = express.Router();

/**
 * CODE ADDITION
 *
 * The following code is added to import additional dependencies
 * and setup Multer for use with the /upload route.
 */

// import multer and the AvatarStorage engine
var _ = require('lodash');
var path = require('path');
var multer = require('multer');
var AvatarStorage = require('../common/helper/AvatarStorage');

// setup a new instance of the AvatarStorage engine
var storage = AvatarStorage({
square: true,
responsive: true,
greyscale: false,
quality: 90
});

var limits = {
files: 1, // allow only 1 file per request
fileSize: 1024 * 1024, // 1 MB (max file size)
};

var fileFilter = function(req, file, cb) {
// supported image file mimetypes
var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

if (_.includes(allowedMimes, file.mimetype)) {
    // allow supported image files
    cb(null, true);
    } else {
    // throw error for invalid files
    cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
    }
};

// setup multer

let  upload= multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
    });
/* CODE ADDITION ENDS HERE */

router.use( express.static('public'))


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(__dirname+"/index.html")
});

router.use(express.static(process.env.AVATAR_STORAGE))

router.post('/avatar-upload', upload.single(process.env.AVATAR_FIELD), (req, res) => {
    var files;
	var file = req.file.filename;
	var matches = file.match(/^(.+?)_.+?\.(.+)$/i);

	if (matches) {
		files = _.map(['lg', 'md', 'sm'], function(size) {
			return matches[1] + '_' + size + '.' + matches[2];
		});
	} else {
		files = [file];
	}

	files = _.map(files, function(file) {
		var port = req.app.get('port');
		var base = req.protocol + '://' + req.hostname + (port ? ':' + port : '');
		var url = path.join(req.file.baseUrl, file).replace(/[\\\/]+/g, '/').replace(/^[\/]+/g, '');

		return  url;
		// return (req.file.storage == 'local' ? base : '') + '/' + url;
	});

	// res.json({
	// 	images: files
	// });
    res.send(`You have uploaded this image: 
    <hr/>
    <p>${files[0]}</p>
    <img src="${files[0]}">
    <hr/>
    <p>${files[1]}</p>
    <img src="${files[1]}">
    <hr/>
    <p>${files[2]}</p>
    <img src="${files[2]}">
    <hr />
    <a href="./">Upload another image</a>`);
});




// module.exports = router;
module.exports = { 
    router:router,
    upload:upload
  }