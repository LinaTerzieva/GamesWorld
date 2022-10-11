import { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';

import AuthenticationContext from '../../../lib/AuthenticationContext';
import { isServerError } from '../../../lib/helpers';
import { AuthContextType, ServerError } from '../../../lib/types';

import styles from './LoginForm.module.css';

type FormData = {
    username: string,
    password: string
}

const LoginForm = (): JSX.Element => {

    const { auth, loginUser } = useContext(AuthenticationContext) as AuthContextType;

    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: ""
    });

    const [serverError, setServerError] = useState<ServerError | {isError: boolean}>({
        errorCode: 0,
        errorMessage: "",
        isError: false
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin();
    }

    const handleLogin = () => {
        loginUser(formData.username, formData.password)
            .then((result) => {
                if (result && result.isError) {
                    setServerError(result);
                }
            });
    }

    if (auth.accessToken) {
        return <Navigate to="/" />;
    }

    return (

        <div>
            <div
                className={styles.containerLogin}
            >
                <div className={styles.wrapLogin}>
                    <form onSubmit={submitHandler} className={styles.loginForm}>
                        <span className={styles.loginFormLogo}>
                            <img src={"/images/companyLogo.png"} />
                        </span>
                        <span className={styles.loginFormTitle}>Log in</span>
                        {serverError.isError && <div className={styles.validationError}>An error has occured. Please try again later.</div>}
                        {serverError.isError && isServerError(serverError) && serverError.errorMessage != '' && <div className={styles.validationError}>{serverError.errorMessage}</div>}
                        <div
                            className={`${styles.wrapInput}`}
                        >
                            <input
                                className={styles.input}
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <span className={styles.focusInput} />
                        </div>
                        <div
                            className={`${styles.wrapInput}`}
                        >
                            <input
                                className={styles.input}
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span className={styles.focusInput} />
                        </div>
                        <div className={styles.containerFormBtn}>
                            <button className={styles.formBtn}>Login</button>
                        </div>
                        <div className={styles.containerFormBtn}>
                            <span className={styles.registerText}>Don't have and account?</span>
                            <Link className={styles.registerLink} to="/register">Register now</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;