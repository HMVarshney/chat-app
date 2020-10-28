import Avatar from '@bit/mui-org.material-ui.avatar';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import Icon from '@bit/semantic-org.semantic-ui-react.icon';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authenticationContext/authContext';
import styles from './navbar.module.css';

const Navbar = () => {

    const { logout, authStatus: { isAuthenticated } } = useContext(AuthContext);

    return (  
        <div className={styles.container}>
            <div>
                <div>
                    <Icon name='snapchat ghost' size='big' color='yellow' />
                </div>
                <div style={{flexGrow: 1}} />
                <div>
                    {isAuthenticated ? 
                        <Button size='small' negative onClick={()=>logout()}>Sign Out</Button>
                    :
                        <Link to='/'>
                            <Button secondary>Login</Button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;