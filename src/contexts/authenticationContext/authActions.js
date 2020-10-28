import axios from 'axios';
import * as URL from '../../constants';
import Cookie from 'js-cookie';

async function loginUser(email, password){
    const response = await axios.post(`${URL.BACKEND_URL}/auth/local`, {
        identifier: email,
        password
    });

    console.log(response);
    return response;
};

function saveInLocalStorage(id, data){
    if(id){
        localStorage.setItem(`${URL.LOCAL_STORAGE_PREFIX}-${id}`, JSON.stringify(data));
    } else return null;
};

function getFromLocalStorage(id){
    if(id){
        return JSON.parse(localStorage.getItem(`${URL.LOCAL_STORAGE_PREFIX}-${id}`));
    } else return null;
};

function deleteFromLocalStorage(id){
    if(id){
        localStorage.removeItem(`${URL.LOCAL_STORAGE_PREFIX}-${id}`);
        return true;
    } else{
        return false;
    }
};

function setCookie(id, data){
    if(id){
        Cookie.set(`${URL.LOCAL_STORAGE_PREFIX}-${id}`, data);
    }
};

function readCookie(id){
    if(id){
        return Cookie.get(`${URL.LOCAL_STORAGE_PREFIX}-${id}`)
    } else return null;
}

function deleteCookie(id){
    if(id){
        Cookie.remove(`${URL.LOCAL_STORAGE_PREFIX}-${id}`);
        return true;
    } else return false;
}

export { loginUser, saveInLocalStorage, getFromLocalStorage, deleteFromLocalStorage, setCookie, readCookie, deleteCookie };