var express = require('express');
var routes = require('./routes');
var partials = require('express-partials');
var errorHandlers = require('./middleware/error_handlers');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var utilities = require('./middleware/utilities');
var RedisStore = require('connect-redis')(session);
var logger = require('./middleware/log');
var flash = require('connect-flash');
var config = require('./config');

var port = process.env.PORT || config.port;
var app = express();

app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'});

app.use(partials());
app.use(logger.log);
app.use(express.static(__dirname + '/static'));
app.use(cookieParser(config.secret));
app.use(session({
        secret: config.secret,
        saveUninitialized: true,
        resave: true,
        store: new RedisStore({url: config.redisUrl})
    })
);

app.use(flash());
app.use(utilities.templateRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(utilities.csrf);
app.use(utilities.authenticated);

app.get('/', routes.index);
app.get(config.routes.login, routes.login);
app.post(config.routes.login, routes.loginProcess);
app.get(config.routes.chat, [utilities.requireAuthentication], routes.chat);
app.get(config.routes.logout, routes.logout);

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(port, () =>
    console.log(`Application server running on port ${port}.`)
);