import React, { createContext, useEffect, useState } from "react";
import { initSocket } from "./conversationActions";

let socket;

export const ConversationContext = createContext();

const ConversationContextProvider = ({children}) => {

    const [activeRoom, setActiveRoom] = useState(null);
    const [messages, setMessages] = useState([]);

    const joinRoom = (id, username, roomID) => {
        setActiveRoom(roomID);

        socket = initSocket(id, username, roomID, socket);
    };

    useEffect(()=>{
        if(activeRoom){
            socket.on('message', (socketResponse) => {
                setMessages((current)=>([...current, socketResponse]));
            });
        }
    },[activeRoom]);

    return (  
        <ConversationContext.Provider value={{joinRoom, messages, activeRoom}}>
            {children}
        </ConversationContext.Provider>
    );
}
 
export default ConversationContextProvider;