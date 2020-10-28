import React from 'react';
import styles from './mainboard.module.css';
import Avatar from '@bit/mui-org.material-ui.avatar';
import Typography from '@bit/mui-org.material-ui.typography';

const ChatBox = ({ messages, user }) => {
    return (  
        <div className={styles.chatBoxContainer}>
            {messages.map((message,i)=>{
                const isCurrentUser = message.user === user;
                return(
                    <div key={i} className={`d-flex ${isCurrentUser ? styles.isCurrentUser : ''}`}>
                        <ChatCard message={message} isCurrentUser={isCurrentUser} />
                    </div>
                )
            })}
        </div>
    );
};
 
export default ChatBox;


const ChatCard = ({ message, isCurrentUser }) => {
    const background = isCurrentUser ? '#e8f4f8' : '#D8BFD8';
    return(
        <div style={{background}} className={styles.chatCardContainer}>
            <div className='mr-2'>
                <Avatar src='/assets/images/user1.jpg' />
            </div>
            <div>
                <Typography className='mr-2' display='inline' variant='caption' color='primary'>{isCurrentUser ? 'You' : message.user}</Typography>
                <Typography display='inline' variant='caption' color='textSecondary'>20:30 pm</Typography>
                <Typography style={{maxWidth:'30vw'}} variant='body1'>{message.message}</Typography>
            </div>
        </div>
    );
}