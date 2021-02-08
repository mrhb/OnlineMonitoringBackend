//testfile management secction
const express = require('express');
const path = require('path');
require('dotenv').config();

var avatar = require('./avatar/avatars');
const port = process.env.PORT || 3001;
const app = express();
app.listen(port, () => console.log(`Listening on port ${port}...`));
app.use('/avatar', avatar);
 