const express = require("express");

const app = express();

const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname+'/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
})
//set up socket
const io = require('socket.io')(http)


//Received message  on server and broadcast to all clients
io.on('connection', (socket) => {
    console.log('connected...')
    socket.on('message', (msg) => {
        
        socket.broadcast.emit('message', msg);
    })
    //if new user joined then let other to server know
    socket.on('user-joined', (name) => {
        socket.broadcast.emit('user-joined', name);
    })
    
    
})

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

