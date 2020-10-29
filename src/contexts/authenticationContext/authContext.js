import Axios from 'axios';
import React from 'react';
import * as URL from '../../constants';
import { createContext, useState } from "react";
import { getFromLocalStorage, deleteFromLocalStorage, loginUser, saveInLocalStorage, readCookie, setCookie, deleteCookie } from "./authActions";

export const AuthContext = createContext();
let socket;

const user_details = getFromLocalStorage('user-details')

const initAuthState = {
    isAuthenticated: Boolean(user_details),
    isVerifying: false,
    userDetails: user_details,
    authenticationError: null,
    jwt: readCookie('auth-jwt')
};

const AuthContextProvider = ({ children }) => {

    const [authStatus, setAuthStatus] = useState(()=>{
        return initAuthState;
    });

    const login = async (email, password) => {
        try{
            const loginResponse = await loginUser(email, password); 
            
            if(loginResponse.status === 200){
                setAuthStatus({ isAuthenticated: true, userDetails: loginResponse.data.user, authenticationError: null, jwt: loginResponse.data.jwt });
                saveInLocalStorage('user-details', loginResponse.data.user);
                setCookie('auth-jwt', loginResponse.data.jwt);

                return loginResponse;
            }

            setAuthStatus({isAuthenticated: false, userDetails: {}, authenticationError: 'Unidentified error', jwt: ''});
            return loginResponse;

        } catch(error){
            console.log(error.response);
            return error.response;
        }
    };

    const logout = () => {
        deleteFromLocalStorage('user-details');
        deleteCookie('auth-jwt');

        setAuthStatus({...authStatus, isAuthenticated: false, user_details: null, jwt: null});
    };

    const updateUserDetails = async () => {
        try{
            const response = await Axios.get(`${URL.BACKEND_URL}/users/${authStatus.userDetails.id}`);

            if(response.status===200){
                setAuthStatus({...authStatus, userDetails: response.data});
                saveInLocalStorage('user-details', response.data);
            }
        } catch(error){
            console.log(error.response);
            window.location.reload();
        }
    }

    return (  
        <AuthContext.Provider value={{authStatus, login, logout, updateUserDetails}}>
            { children }
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;
