import Modal from '@bit/react-bootstrap.react-bootstrap.modal';
import React, { useRef, useState } from 'react';
import Form from '@bit/react-bootstrap.react-bootstrap.form';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import Typography from '@bit/mui-org.material-ui.typography';
import Alert from '@bit/react-bootstrap.react-bootstrap.alert';
import { useContacts } from '../../../contexts/contactContext/ContactContext';

const NewContactModal = () => {

    const idRef = useRef();
    const nameRef = useRef();

    const { createContact } = useContacts();
    const [showAlert, setAlert] = useState({
        show: false,
        message: '',
        error: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const contactCreated = createContact(idRef.current.value, nameRef.current.value);

        if(contactCreated)
            setAlert({show: true, message: 'Contact created successfully!', error: null});
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
                            <Form.Label>Chat ID</Form.Label>
                            <Form.Control type='text' placeholder='Enter ID' required ref={idRef} />
                            <Form.Text className='text-muted'>
                                We'll never share your email.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Contact Name' required ref={nameRef} />
                        </Form.Group>

                        <Button type='submit' color='purple'>Add Contact</Button>
                    </Form>
                </div>
            </Modal.Body>

            {showAlert.show && 
                <div className='mt-2 mb-2'>
                    <Alert variant='success'>
                        <Typography variant='body1'>{showAlert.message}</Typography>
                    </Alert>
                </div>
            }
        </div>
    );
}
 
export default NewContactModal;