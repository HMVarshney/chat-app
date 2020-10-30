const port = process.env.PORT + 1 || 5000;

const express = require('express');
const app = express();

const server = app.listen(port, () => {
    console.log(`Server Connected on port ${port}.`);
});

const socket = require('socket.io');
const io = socket(server);

const { addUser, getUser, getUsersInRoom, deleteUser } = require('./userHandler');

io.on('connection', (socket) => {
    console.log('connected');

    socket.on('join', (userInfo, callback)=>{
        const { error, user } = addUser(userInfo, socket.id);

        if(user){
            socket.join(user.roomID);
            socket.emit('message', { user: 'ChatBot', message: `Welcome ${user.name}` });
            socket.broadcast.to(user.roomID).emit('message', { user:'ChatBot', message: `${user.name} has joined the chat` });
        }

        callback({error, user});
    });

    socket.on('sendMessage', ({user, message}, callback)=>{

        const person = getUser(user.id);

        io.to(person.roomID).emit('message', { user: user.username, message });

        callback();
    });

    socket.on('disconnect', (data) => {
        console.log(deleteUser(socket.id));
        socket.disconnect();
    });
});
