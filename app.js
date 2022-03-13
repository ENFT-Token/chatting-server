var app = require('express')();
var server = require('http').createServer(app);

var io = require('socket.io')(server);

require('moment-timezone');
var moment = require('moment');
moment.tz.setDefault("Asia/Seoul");

app.get('/', function(req, res) {
    res.send('hello world');
});

io.on('connection',(socket) => {
    console.log('connetion')
    // send data 
    socket.on('message',(data) =>{
        console.log('message:',data)

        // send data from sender except sender
        socket.broadcast.emit('message',data);
        // test
        // socket.emit("receive", {"id": socket.id, "message":"응답", "username": "강선규", "sendAt": moment().format('YYYY-MM-DD HH:mm:ss')})
    })

    socket.on('image', (data)=>{
        console.log('image:', data)

        socket.broadcast.emit('image', data);
    })
    socket.on('disconnect', (reason) => {
        console.log("disconnect:", socket.id);
    })
})

server.listen(3000, function() {
    console.log('Socket IO server listening on port 3000');
});

