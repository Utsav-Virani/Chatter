var app = require('express')();
var http = require('http').createServer(app);
const PORT = 4000;
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});
http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
    console.log('new client connected on docket : ', socket.id);
    socket.emit('connection', null);
    socket.on('chat', function ({ name, message }) {
        io.sockets.emit('chat', { name, message });
    })
});