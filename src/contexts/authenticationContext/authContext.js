import React from 'react';
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
        deleteCookie('auth-jwt')
    };

    return (  
        <AuthContext.Provider value={{authStatus, login, logout}}>
            { children }
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;
