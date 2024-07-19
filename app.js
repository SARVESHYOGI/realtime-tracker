const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    // console.log('A user connected');
    socket.on('sendLocation', (data) => {
        // console.log('Location received:', data);
        io.emit('receiveLocation', { id: socket.id, ...data });
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        io.emit('user-disconnected', { id: socket.id });
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
