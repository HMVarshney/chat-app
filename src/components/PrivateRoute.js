import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authenticationContext/authContext';
const { Route, Redirect } = require("react-router-dom");
const { default: Dashboard } = require("../pages/dashboard/dashboard");
const { default: Login } = require("../pages/login/login");


const PrivateRoute = ({ component: Component, rest }) => {

    const { authStatus: { isAuthenticated } } = useContext(AuthContext);

    return(
       <Route {...rest} render={(props)=>
            isAuthenticated ? <Component /> : <Redirect to={{pathname: '/', state: { from: props.location }}} /> }
        />
    )
};


export default PrivateRoute;