import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './LoginForm.module.css';
import companyLogo from './../../../images/companyLogo.png';
import useAuthenticationApi from '../../../lib/useAuthenticationApi';

const LoginForm = () => {

    const { login } = useAuthenticationApi();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [showError, setShowError] = useState(false);
    const [validationError, setValidationError] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setValidationError("");

        handleLogin();
    }

    const handleLogin = () => {

        login(formData.username, formData.password)
            .then((data) => {
                if (data.code === 403) {
                    setValidationError(data.message);
                }
                console.log(data);
            })
            .catch((error) => {
                setShowError(true);
            });
    }


    return (
        <div>
            <div
                className={styles.containerLogin}
            >
                <div className={styles.wrapLogin}>
                    <form onSubmit={submitHandler} className={styles.loginForm}>
                        <span className={styles.loginFormLogo}>
                            <img src={companyLogo} />
                        </span>
                        <span className={styles.loginFormTitle}>Log in</span>
                        {showError && <div className={styles.validationError}>An error has occured. Please try again later.</div>}
                        {validationError != '' && <div className={styles.validationError}>{validationError}</div>}
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