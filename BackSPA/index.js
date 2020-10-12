const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const UnitsRouter = require('./units/routes.config');
const TrendssRouter = require('./trends/routes.config');
const Root="F:/mr.Hajjar/OnlineMonitoring/UI_SPA/uiSPA/dist/uiSPA"
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
app.use('/ui',express.static(Root));

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
UnitsRouter.routesConfig(app);
TrendssRouter.routesConfig(app);

app.get('/ui/*', (req,res) => {
    res.sendFile(Root+"/index.html")
  });

  app.get('/', (req,res) => {
    res.sendFile(Root+"/index.html")
  });


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
