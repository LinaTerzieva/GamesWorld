import { useState } from 'react';

import useAuthenticationApi from './useAuthenticationApi';
import AuthenticationContext from './AuthenticationContext'

export const AuthenticationProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        id: '',
        username: '',
        accessToken: '',
        errorCode: '',
        errorMessage: '',
        isError: false
    });

    const { login } = useAuthenticationApi();
    
    const loginUser = (username, password) => login(username, password)
        .then((data) => 
        {
            console.log(data);
            if (data.code === 403) {
                setAuth({
                    errorCode: 403, 
                    errorMessage: data.message,
                    isError: true
                });
            } else {
                setAuth({
                    id: data._id, 
                    username: data.username, 
                    accessToken: data.accessToken
                });
            }
        })
        .catch((error) => {
            setAuth({
                isError: true
            })
        });;

    return (
        <AuthenticationContext.Provider value={{ auth, loginUser }}>
            {children}
        </AuthenticationContext.Provider>
    );
};