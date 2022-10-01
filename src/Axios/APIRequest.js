import Axios from 'axios';

export const APIRequest = Axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    "Content-Type": "application/json"
});

export const setAuthToken = (authToken = "") => {
    // set axios auth header
    APIRequest.defaults.headers.common["Authorization"] = authToken;

    // save to local storage
    localStorage.setItem('@token', authToken);
    // setStorage('@token', authToken);
}

export const getAuthToken = () => {
    return localStorage.getItem('@token');
    // return getStorage('@token');
}