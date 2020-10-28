import React, { useContext, useState } from 'react';
import Tab from '@bit/semantic-org.semantic-ui-react.tab';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import Modal from '@bit/react-bootstrap.react-bootstrap.modal';
import Avatar from '@bit/mui-org.material-ui.avatar';
import NewContactModal from './NewContactModal';
import { useContacts } from '../../../contexts/contactContext/ContactContext';
import Typography from '@bit/mui-org.material-ui.typography';
import { AuthContext } from '../../../contexts/authenticationContext/authContext';

const groups = [
    {roomID: '123456', title: 'Test Group', usersNumber: 5}
]

const Sidebar = ({ initSocket }) => {

    const { authStatus: { userDetails: { id, username } } } = useContext(AuthContext)

    const [tabSelected, toggleTabs] = useState(0);
    const [modalOpen, toggleModal] = useState(false);

    const ContactsTab = () => {
        const { contacts } = useContacts();
    
        return(
            <Tab.Pane style={{minHeight:'80vh'}}>
            {contacts.map((contact)=>(
                <div key={contact.id}>
                    <ConversationCard conversation={contact} />
                </div>
            ))}
            </Tab.Pane>
        );
    };
    
    const GroupsTab = () => {
        return(
            <Tab.Pane style={{minHeight:'80vh'}}>
                {groups.map((group)=>(
                    <div key={group.roomID} onClick={()=>initSocket(id, username, group.roomID)}>
                        <ConversationCard conversation={group} />
                    </div>
                ))}
            </Tab.Pane>
        );
    }

    const panes = [
        { menuItem: 'Contacts', render: () => <ContactsTab /> },  
        { menuItem: 'Groups', render: () => <GroupsTab />},
    ];

    return (  
        <div style={{width:'15vw'}} className='d-flex flex-column'>
            <div>
                <Tab panes={panes} activeIndex={tabSelected} onTabChange={(e, { activeIndex })=>toggleTabs(activeIndex)} />
            </div>
            <div style={{padding:'5px'}}>
                <Button onClick={()=>toggleModal(true)} color='purple' fluid>New Contact</Button>
            </div>
            <div>
                <div className='p-2 small border-right'>
                    Your ID: {id}
                </div>
            </div>

            <Modal size='lg' show={modalOpen} onHide={()=>toggleModal(false)}>
                <NewContactModal />
            </Modal>
        </div>
    );
}
 
export default Sidebar;

const ConversationCard = ({ conversation }) => (
    <div style={{cursor: 'pointer'}} className='d-flex align-items-center p-lg-3 p-1'>
        <div className='mr-3'>
            <Avatar src='/assets/images/user1.jpg' />
        </div>
        <div>
            <Typography variant='body2'>{conversation.title}</Typography>
        </div>
    </div>
);