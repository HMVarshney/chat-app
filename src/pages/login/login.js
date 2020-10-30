import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import Form from '@bit/react-bootstrap.react-bootstrap.form';
import Typography from '@bit/mui-org.material-ui.typography';
import { AuthContext } from '../../contexts/authenticationContext/authContext';

const Login = ({ history }) => {
    const { login, authStatus: { isAuthenticated, isVerifying } } = useContext(AuthContext);
    const passwordRef = useRef();

    const [loginDetails, setDetails] = useState({
        email: '',
        password: ''
    });

    const loginFunction = async (e) => {
        e.preventDefault();

        await login(loginDetails.email, loginDetails.password);
    };

    const showPassword = () => {
        const isShowingPassword = passwordRef.current.type === 'text' ? true : false;
        passwordRef.current.type = isShowingPassword ? 'password' : 'text';
    }

    useEffect(()=>{
        if(isAuthenticated){
            history.push('/dashboard');
        }
    },[isAuthenticated]);

    return (  
        <div style={{minHeight:'50vh'}} className='d-flex flex-column align-items-center justify-content-center'>
            <div className='mb-3'>
                <Typography variant='h4' color='secondary'><strong>Login</strong></Typography>
            </div>

            <div>
                <Form onSubmit={(e)=>loginFunction(e)} className='d-flex flex-column align-items-center'>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' value={loginDetails.email} onChange={(e)=>setDetails({...loginDetails, email: e.target.value})} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' value={loginDetails.password} onChange={(e)=>setDetails({...loginDetails, password: e.target.value})} required ref={passwordRef} />
                        <Form.Check className='mt-2 mb-1' onChange={()=>showPassword()} type='checkbox' label='Show Password' />
                    </Form.Group>
                    <Form.Group style={{width:'100%'}}>
                        <Button loading={isVerifying} style={{width:'100%'}} type='submit' className='mr-2' basic color='purple'>Join</Button>
                    </Form.Group>
                </Form>
            </div>
        </div> 
    );
}
 
export default Login;