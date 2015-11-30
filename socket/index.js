'use strict';

let io = require('socket.io');
const config = require('../config');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const ConnectRedis = require('connect-redis')(expressSession);
const redisSession = new ConnectRedis({host: config.redisHost, port: config.redisPort});
const redisAdapter = require('socket.io-redis');

const socketAuth = function (socket, next) {
    const handShakeData = socket.request;
    const parsedCookie = cookie.parse(handShakeData.headers.cookie);
    var sid = cookieParser.signedCookie(parsedCookie['connect.sid'], config.secret);

    redisSession.get(sid, function (err, session) {
        if (session.isAuthenticated) {
            socket.user = session.user;
            socket.sid = sid;
            return next();
        } else {
            return next(new Error('Not Authenticated'));
        }
    });
};

const socketConnection = function (socket) {
    socket.emit('message', {message: 'Hey!'});
    socket.emit('message', socket.user);

    socket.on('GetMe', function () {

    });

    socket.on('GetUser', function (room) {

    });

    socket.on('GetChat', function (data) {

    });

    socket.on('AddChat', function (chat) {

    });

    socket.on('GetRoom', function () {

    });

    socket.on('AddRoom', function (room) {

    });

    socket.on('disconnect', function () {

    });
};

module.exports.startIo = function (server) {
    io = io.listen(server);
    io.adapter(redisAdapter({host: config.redisHost, port: config.redisPort}));

    const packtChat = io.of('/packtchat');

    packtChat.use(socketAuth);
    packtChat.on('connection', socketConnection);

    return io;
};