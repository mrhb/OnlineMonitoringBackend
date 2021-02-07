//testfile management secction
const express = require('express');
const multer = require('multer');
const path = require('path');

const helpers = require('./common/helper/fileHelper');


const http = require('http')
const fs = require('fs')


const Root=__dirname;
const port = process.env.PORT || 3001;


const app = express();

app.get('/', (req,res) => {
    res.sendFile(Root+"/index.html")
    });


app.get('/uploads/*', (req,res) => {
    res.sendFile(Root+"/uploads/"+req.params[0])
    });

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));



//API


app.post('/upload-profile-pic', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
});