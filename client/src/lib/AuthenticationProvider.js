
import useUserApi from './useUserApi';
import AuthenticationContext from './AuthenticationContext'
import useLocalStorage from './useLocalStorage';
import { useState } from 'react';

export const AuthenticationProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage("auth", {
        id: '',
        username: '',
        accessToken: '',
    });

    const { login, logout, register } = useUserApi();

    const loginUser = (username, password) => login(username, password)
        .then((data) => {
            if (data.code === 403) {
                return {
                    errorCode: 403,
                    errorMessage: data.message,
                    isError: true
                };
            } else {
                setAuth({
                    id: data._id,
                    username: data.username,
                    accessToken: data.accessToken
                });
            }
        })
        .catch((error) => {
            return {
                isError: true
            }
        });

    const logoutUser = () => logout(auth.accessToken)
        .then((data) => {
            setAuth({
                id: '',
                username: '',
                accessToken: ''
            });
            return {
                errorCode: '',
                errorMessage: '',
                isError: false
            }
        })
        .catch((error) => {
            return {
                isError: true
            }
        });

    
    const registerUser = (username, password, firstName, lastName) => 
        register(username, password, firstName, lastName)
            .then((data) => {
                if (data.code === 409) {
                    return {
                        errorCode: 409,
                        errorMessage: data.message,
                        isError: true
                    };
                } else {
                    setAuth({
                        id: data._id,
                        username: data.username,
                        accessToken: data.accessToken
                    });
                }
            })
            .catch((error) => {
                return {
                    isError: true
                }
            });

    return (
        <AuthenticationContext.Provider value={{ auth, loginUser, logoutUser, registerUser }}>
            {children}
        </AuthenticationContext.Provider>
    );
};