import { createContext, useContext, useState } from "react";
import useLocalStorage from "../../custom-hooks/useLocalStorage";
import React from 'react';

const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {

    const [contacts, setContacts] = useLocalStorage('contacts', []);

    const createContact = (id, name) => {
        setContacts([...contacts, { id, name }]);

        return true;
    }

    return (  
        <ContactContext.Provider value={{contacts, createContact}}>
            {children}
        </ContactContext.Provider>
    );
};

function useContacts(){
    return useContext(ContactContext);
}
 
export { ContactContextProvider, useContacts };