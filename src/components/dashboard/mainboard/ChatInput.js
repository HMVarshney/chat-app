import React, { useContext, useState } from 'react';
import Input from '@bit/semantic-org.semantic-ui-react.input';
import styles from './mainboard.module.css';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import Icon from '@bit/semantic-org.semantic-ui-react.icon';
import { sendMessage } from '../../../contexts/conversationContext/conversationActions';
import { AuthContext } from '../../../contexts/authenticationContext/authContext';

const ChatInput = () => {

    const { authStatus: { userDetails } } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    const send = () => {
        if(message){
            sendMessage(message, userDetails);
            setMessage('');
        }
    }

    return (  
        <div className='row no-gutters align-items-center mt-2'>
            <div className='col-10 mr-2'>
                <Input className={styles.chatInput} placeholder='Enter Message' value={message} onChange={(e)=>setMessage(e.target.value)} onKeyPress={(e)=>e.key==='Enter' ? send() : null } />
            </div>
            <div className='col'>
                <Button animated color='purple' onClick={()=>send()}>
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
