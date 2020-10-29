import React, { Suspense, useContext, useEffect, useState } from 'react';
import Tab from '@bit/semantic-org.semantic-ui-react.tab';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import Modal from '@bit/react-bootstrap.react-bootstrap.modal';
import Avatar from '@bit/mui-org.material-ui.avatar';
import { useContacts } from '../../../contexts/contactContext/ContactContext';
import Typography from '@bit/mui-org.material-ui.typography';
import { AuthContext } from '../../../contexts/authenticationContext/authContext';
import { ConversationContext } from '../../../contexts/conversationContext/conversationContext';
import { fetchGroups } from '../api/groups/fetchGroups';
import JoinGroupModal from './JoinGroupModal';
import Icon from '@bit/semantic-org.semantic-ui-react.icon';

const NewGroupModal = React.lazy(()=>import('./NewGroupModal'));
const RiseLoader = React.lazy(()=>import('@bit/davidhu2000.react-spinners.rise-loader'));


const Sidebar = () => {

    const { authStatus: { userDetails: { id, username } } } = useContext(AuthContext);
    const { joinRoom } = useContext(ConversationContext);

    const [tabSelected, toggleTabs] = useState(0);
    const [modalOpen, toggleModal] = useState(false);
    const [groups, setGroups] = useState({
        loading: true,
        groups: [],
        error: null
    });

    useEffect(()=>{
        (async()=>{
            try{
                const response = await fetchGroups(id);
                
                if(response.status === 200){
                    setGroups({loading: false, groups: response.data, error: null});
                }

            } catch(error){
                setGroups({loading: false, groups: [], error});
            }
        })();
    },[]);

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

        if(groups.loading){
            return(
                <Suspense fallback={<div>loading</div>}>
                    <div style={{height:'100%', width:'100%'}} className='d-flex align-items-center justify-content'>
                        <RiseLoader color='purple' size='30' />
                    </div>
                </Suspense>
            )
        } else if(groups.groups.length === 0){
            return(
                <div style={{minHeight:'80vh'}} className='d-flex justify-content-center align-items-center'> 
                    <Typography variant='body1' color='secondary'>No Groups found!</Typography>
                </div>
            );
        }

        return(
            <Tab.Pane style={{minHeight:'80vh'}}>
                {groups.groups.map((group)=>(
                    <div key={group.group_id} onClick={()=>joinRoom(id, username, group.group_id)}>
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
            <div className='d-flex align-items-center p-2'>
                <Button onClick={()=>toggleModal('create')} color='purple' fluid>New Group</Button>
                <Button onClick={()=>toggleModal('join')} fluid secondary>Join Group</Button>
            </div>
            <div>
                <div className='p-2 small border-right'>
                    Your ID: {id}
                </div>
            </div>

            <Modal size='lg' show={Boolean(modalOpen)} onHide={()=>toggleModal(null)}>
                <Suspense fallback={<div>loading...</div>}>
                    {modalOpen === 'create' && 
                        <NewGroupModal handleClose={toggleModal} />
                    }
                    {modalOpen === 'join' && 
                        <JoinGroupModal handleClose={toggleModal} />
                    }
                </Suspense>
            </Modal>
        </div>
    );
}
 
export default Sidebar;

const ConversationCard = ({ conversation }) => (
    <div style={{cursor: 'pointer'}} className='d-flex align-items-center p-lg-3 p-1'>
        <div className='col-3'>
            <Avatar src='/assets/images/user1.jpg' />
        </div>
        <div className='col-7'>
            <Typography variant='body2'>{conversation.group_name}</Typography>
        </div>
        <div className='col-2'>
            <Icon onClick={()=>console.log('delete')} name='window minimize outline' color='red' />
        </div>
    </div>
);