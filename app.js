var express = require('express');
var routes = require('./routes');
var partials = require('express-partials');
var errorHandlers = require('./middleware/error_handlers');
var logger = require('./middleware/log');
var port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'});

app.use(partials());
app.use(logger.log);
app.use(express.static(__dirname + '/static'));

app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/chat', routes.chat);

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(port, () =>
    console.log(`Application server running on port ${port}.`)
);