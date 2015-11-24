var express = require('express');
var routes = require('./routes');
var errorHandlers = require('./middleware/error_handlers');
var port = process.env.PORT || 3000;

var app = express();

app.use(errorHandlers.notFound);

app.get('*', function (req, res) {
   res.send('Express response');
});

app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/', routes.chat);

app.listen(port, function () {
    console.log("Application server running on port ${port}.");
});