const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
http.listen(3000, () => {
    console.log(`Listening on port ${PORT}`);
});

// Socket Work
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("Connected...");
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})