import Modal from '@bit/react-bootstrap.react-bootstrap.modal';
import React, { useContext, useRef, useState } from 'react';
import Form from '@bit/react-bootstrap.react-bootstrap.form';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import Typography from '@bit/mui-org.material-ui.typography';
import Alert from '@bit/react-bootstrap.react-bootstrap.alert';
import { createGroup } from '../api/groups/createGroup';
import { AuthContext } from '../../../contexts/authenticationContext/authContext';
import { v4 as uuid } from 'uuid';

const NewContactModal = ({ handleClose }) => {

    const uniqueID = uuid();

    const { authStatus: { userDetails, jwt }, updateUserDetails } = useContext(AuthContext);

    const descRef = useRef();
    const nameRef = useRef();

    const [uploadStatus, setUploadStatus] = useState({
        uploading: false,
        uploadSuccess: false,
        error: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadStatus({uploading: true, uploadSuccess: false, error: null});

        try{
            const response = await createGroup({name: nameRef.current.value, desc: descRef.current.value, userID: userDetails.id, groupID: uniqueID}, jwt);  

            if(response.status===200){
                setUploadStatus({uploading: false, uploadSuccess: true, error: null});
                handleClose(null);
                updateUserDetails();
            }

        } catch(error){
            console.log(error);
            setUploadStatus({uploading: false, uploadSuccess: false, error: error });
        }
    };

    return (  
        <div>
            <Modal.Header closeButton>
                <Typography variant='h6'>Add Contact</Typography>
            </Modal.Header>
            <Modal.Body>
                <div className='p-lg-3 p-1'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' required ref={nameRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as='textarea' row={2} type='text' placeholder='Enter Description' required ref={descRef} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Group ID</Form.Label>
                            <Form.Control type='text' readOnly value={uniqueID} />
                        </Form.Group>

                        <Button type='submit' color='purple'>Create Group</Button>
                    </Form>
                </div>
            </Modal.Body>

            {uploadStatus.uploadSuccess && 
                <div className='mt-2 mb-2 p-4'>
                    <Alert variant='success'>
                        <Typography variant='body1'>Group Created Successfully!</Typography>
                    </Alert>
                </div>
            }

            {uploadStatus.error && 
                <div className='mt-2 mb-2 p-4'>
                    <Alert variant='danger'>
                        <Typography variant='body1'>There was a problem creating the group. Please try again.</Typography>
                    </Alert>
                </div>
            }
        </div>
    );
}
 
export default NewContactModal;