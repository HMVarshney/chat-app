import React from 'react';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

const ChatContainer = ({ send, messages, user }) => {
    return (  
        <div>
            <h2 className='text-center'>Chats</h2>
            <ChatBox messages={messages} user={user} />
            <ChatInput send={send} />
        </div>
    );
}
 
export default ChatContainer;