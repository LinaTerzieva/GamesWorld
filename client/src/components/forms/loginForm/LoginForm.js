import { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';

import AuthenticationContext from '../../../lib/AuthenticationContext';

import styles from './LoginForm.module.css';


const LoginForm = () => {

    
    const { auth, loginUser } = useContext(AuthenticationContext);
    
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();

        handleLogin();

    }

    const handleLogin = () => loginUser(formData.username, formData.password);


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
                        {auth.isError && auth.errorCode == '' && <div className={styles.validationError}>An error has occured. Please try again later.</div>}
                        {auth.isError && auth.errorMessage != '' && <div className={styles.validationError}>{auth.errorMessage}</div>}
                        <div
                            className={`${styles.wrapInput} ${styles.validateInput}`}
                            data-validate="Enter username"
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
                            className={`${styles.wrapInput} ${styles.validateInput}`}
                            data-validate="Enter password"
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