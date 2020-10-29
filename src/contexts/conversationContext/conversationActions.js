import io from 'socket.io-client';
import * as URL from '../../constants';

let socket;

function initSocket(id, username, roomID){

    socket = io(URL.SOCKET_URL);
    
    socket.emit('join', { id, name: username, roomID }, ({ error, user })=>{
        if(error)
            console.log(error);
        else 
            console.log(user);
    })

    return socket;
};


function sendMessage(message, userDetails){
    // console.log(message, userDetails)
    socket.emit('sendMessage', {user: {id: userDetails.id , username: userDetails.username }, message}, (response) => {});
};


// function socketDisconnect(userDetails){
//     socket.emit('disconnect');
//     socket.off();
// };


export { initSocket, sendMessage };