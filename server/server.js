import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { heartbeat } from './heartbeat.js'

const port = 8500;
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(`a user connected with ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`a user disconnected with ${socket.id}`);
    })
});

setInterval(() => {
    io.emit('PULSE', heartbeat())
}, 1000);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, './public/index.html'));
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
