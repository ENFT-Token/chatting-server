var app = require('express')();
var server = require('http').createServer(app);

var io = require('socket.io')(server);

require('moment-timezone');
// const { fstat } = require('fs');
var moment = require('moment');
moment.tz.setDefault("Asia/Seoul");

app.get('/', function(req, res) {
    res.send('hello world');
});

io.on('connection',(socket) => {
    console.log('connetion')
    // send data 
    socket.on('textMessage',(data) =>{
        console.log('message:',data)

        // send data from sender except sender
        socket.broadcast.emit('textMessage',data);
        // test
        // socket.emit("receive", {"id": socket.id, "message":"응답", "username": "강선규", "sendAt": moment().format('YYYY-MM-DD HH:mm:ss')})
    })

    socket.on('imageMessage', (data) => {
        console.log('message:',data)

        // send data from sender except sender
        socket.broadcast.emit('imageMessage',data);
    })
    // socket.on('imageMessage', async image => {
    //     console.log('image:', image)
        
    //     // // image is an array of bytes
    //     // const buffer = Buffer.from(image)
    //     // await fstat.writeFile('/tmp/image', buffer).catch(console.error)
        
    //     // send image from sender except sender
    //     socket.broadcast.emit('imageMessag', image.toString('base64'))
    // })
    socket.on('disconnect', (reason) => {
        console.log("disconnect:", socket.id);
    })
})

server.listen(3000, function() {
    console.log('Socket IO server listening on port 3000');
});

