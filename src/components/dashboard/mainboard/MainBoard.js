import React from 'react';
import ChatContainer from './ChatContainer';

const MainBoard = ({ send, messages, user }) => {
    return (  
        <ChatContainer send={send} messages={messages} user={user} />
    );
}
 
export default MainBoard;