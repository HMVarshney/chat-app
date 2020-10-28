import React, { useState } from 'react';
import Input from '@bit/semantic-org.semantic-ui-react.input';
import styles from './mainboard.module.css';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import Icon from '@bit/semantic-org.semantic-ui-react.icon';

const ChatInput = ({ send }) => {

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if(message){
            send(message);
            setMessage('');
        }
    }

    return (  
        <div className='row no-gutters align-items-center mt-2'>
            <div className='col-10 mr-2'>
                <Input className={styles.chatInput} placeholder='Enter Message' value={message} onChange={(e)=>setMessage(e.target.value)} onKeyPress={(e)=>e.key==='Enter' ? sendMessage() : null } />
            </div>
            <div className='col'>
                <Button animated color='purple' onClick={()=>sendMessage()}>
                    <Button.Content visible>Send</Button.Content>
                    <Button.Content hidden>
                        <Icon name='paper plane' />
                    </Button.Content>
                </Button>
            </div>
        </div>
    );
}
 
export default ChatInput
