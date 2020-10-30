import Typography from "@bit/mui-org.material-ui.typography";
import Alert from "@bit/react-bootstrap.react-bootstrap.alert";
import Form from "@bit/react-bootstrap.react-bootstrap.form";
import Modal from "@bit/react-bootstrap.react-bootstrap.modal";
import Button from "@bit/semantic-org.semantic-ui-react.button";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/authenticationContext/authContext";
import { joinGroup } from "../api/groups/joinGroup";

const JoinGroupModal = ({ handleClose }) => {

    const { authStatus: { userDetails, jwt }, updateUserDetails } = useContext(AuthContext);

    const idRef = useRef();

    const [uploadStatus, setUploadStatus] = useState({
        uploading: false,
        uploadSuccess: false,
        error: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await joinGroup(idRef.current.value, userDetails, jwt);

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
                    <Form onSubmit={(e)=>handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Group ID</Form.Label>
                            <Form.Control type='text' required ref={idRef} />
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit' color='purple'>Join Group</Button>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>

            {uploadStatus.uploadSuccess && 
                <div className='p-2'>
                    <Alert variant='success'>
                        <Typography variant='body1'>You are now part of the group.</Typography>
                    </Alert>
                </div>
            }

            {uploadStatus.error && 
                <div className='p-2'>
                    <Alert variant='danger'>
                        <Typography variant='body1'>There was a problem joining the group. Please try again.</Typography>
                    </Alert>
                </div>
            }
        </div>
    );
}
 
export default JoinGroupModal;