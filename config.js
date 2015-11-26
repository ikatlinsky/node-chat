let config = {
    port: 3000,
    secret: 'secret',
    redisUrl: 'redis://localhost',
    routes: {
        login: '/login',
        logout: '/logout',
        chat: '/chat'
    }
};

module.exports = config;