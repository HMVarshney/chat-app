import React, { useContext, useEffect, useState } from 'react';
import MainBoard from '../../components/dashboard/mainboard/MainBoard';
import Sidebar from '../../components/dashboard/sidebar/Sidebar';
import * as URL from '../../constants';
import io from 'socket.io-client';
import { AuthContext } from '../../contexts/authenticationContext/authContext';

let socket;

const Dashboard = () => {

    const { authStatus: { userDetails } } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);

    const sendMessage = (message) => {
        socket.emit('sendMessage', {user: {id: userDetails.id , username: userDetails.username }, message}, (response) => {});
    };

    useEffect(()=>{
        return () => {
            socket.emit('disconnect', { user: { id: userDetails.id } });
            socket.off();
        }
    },[])

    return (  
        <div className='row no-gutters justify-content-center'>
            <div className='col-2'>
                <Sidebar initSocket={initSocket} />
            </div>
            <div className='col p-3 mt-3'>
                <div className='d-flex justify-content-center'>
                    <div className='col-10'>
                        <MainBoard send={sendMessage} messages={messages} user={userDetails.username} />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;


function initSocket(id, username, room){

    socket = io(URL.SOCKET_URL);
    
    socket.emit('join', {id, name: username, room}, ({ error, user })=>{
        if(error)
            console.log(error);
        else 
            console.log(user);
    })

    socket.on('message', (socketResponse)=>{
        // setMessages((current)=>([...current, socketResponse]));
        console.log(socketResponse)
    });
};
