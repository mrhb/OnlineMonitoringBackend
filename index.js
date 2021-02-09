const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const ProfileRouter = require('./profile/routes.config');
const UnitsRouter = require('./units/routes.config');
const GroupsRouter = require('./groups/routes.config');
const TrendssRouter = require('./trends/routes.config');
const SidebarRouter = require('./sidebar/routes.config');
//const Root="F:/mr.Hajjar/OnlineMonitoring/UI_SPA/uiSPA/dist/uiSPA"
const Root=__dirname+'\\uiSPA_Prod';
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
app.use('/',express.static(Root));

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
UnitsRouter.routesConfig(app);
GroupsRouter.routesConfig(app);
TrendssRouter.routesConfig(app);
SidebarRouter.routesConfig(app);
ProfileRouter.routesConfig(app);
app.use('/uploads/avatars',express.static(process.env.AVATAR_STORAGE))

app.get('/*', (req,res) => {
    res.sendFile(Root+"/index.html")
  });

app.get('/', (req,res) => {
res.sendFile(Root+"/index.html")
});

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});


