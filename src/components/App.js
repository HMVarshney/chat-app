import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../pages/login/login';
import 'semantic-ui-css/semantic.min.css'
import Dashboard from '../pages/dashboard/dashboard';
import { ContactContextProvider } from '../contexts/contactContext/ContactContext';
import AuthContextProvider from '../contexts/authenticationContext/authContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar/Navbar';

const App = () => {
    return (  
        <AuthContextProvider>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Login} />
                    <PrivateRoute exact path='/dashboard' component={DashboardComponent} />
                </Switch>
            </BrowserRouter>
        </AuthContextProvider>
    );
};
 
export default App;


const DashboardComponent = () => (
    <ContactContextProvider>
        <Dashboard />
    </ContactContextProvider>
);