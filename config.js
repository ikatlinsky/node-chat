'use strict';

let config = {
    port: 3000,
    secret: 'secret',
    redisPort: 6379,
    redisHost: 'localhost',
    routes: {
        login: '/login',
        logout: '/logout',
        chat: '/chat'
    }
};

module.exports = config;