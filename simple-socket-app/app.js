var io = require('socket.io').listen(4000, () => console.log("Application is running"));

io.sockets.on('connection', function(socket){
    socket.emit('ping');

    socket.on('pong', function(data){
        console.log('pong');
    });
});