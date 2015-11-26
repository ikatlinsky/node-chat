var utilities = require('../middleware/utilities');
var config = require('../config');

function index (req, res) {
    res.render('index', {
        title: 'Index'
    });
}

function login (req, res) {
    res.render('login', {title: 'Login', message: req.flash('error')});
}

function loginProcess(req, res) {
    var isAuth = utilities.authenticate(req.body.username, req.body.password, req.session);

    if (isAuth) {
        res.redirect(config.routes.chat);
    } else {
        req.flash('error', 'Wrong username or password.');
        res.redirect(config.routes.login);
    }
}

function chat (req, res) {
    res.render('chat', {title: 'Chat'});
}

function logout (req, res) {
    "use strict";

    utilities.logout(req.session);
    res.redirect('/');
}

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.logout = logout;