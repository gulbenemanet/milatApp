const express = require('express');
const http = require("http");
const app = express();
const socketIO = require('socket.io');
const server = http.createServer(app);
const cors = require("cors");
const io = socketIO(server, {
    cors: {
        origin: '*',
    }
});


server.listen(5000)
app.use(cors());

io.on('connection', (socket) => {
    // socket.send(JSON.stringify({
    //     type: "hello from server",
    //     content: [1, "2"]
    // }));
    console.log("socketio a user connected");
    socket.on('update', function(data) {
        io.emit('update', { data })
    });
    socket.on('message', (data) => {
        console.log(data);
    })
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/socket.html')
})