var app = require('express')();
var server = require('http').createServer(app);

var io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.send('hello world');
});
io.on('connection',(socket) => {
    console.log("conn")
    socket.on('send',(data) =>{
        console.log("send:",data);

        socket.emit("send",data);
    })

    socket.on(('reconnect'), ()=> {
        console.log("reconnect")
    })

    socket.on('disconnect', (reason) => {
        console.log("disconnect:", reason);
    })
})
server.listen(3000, function() {
    console.log('Socket IO server listening on port 3000');
});

