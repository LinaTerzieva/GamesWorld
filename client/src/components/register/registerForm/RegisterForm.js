import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import styles from './RegisterForm.module.css';
import companyLogo from './../../../images/companyLogo.png';

const RegisterForm = () => {

    let navigate = useNavigate();

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

        handleRegister();
    }

    const handleRegister = () => {
        fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 409) {
                    setValidationError(data.message);
                } else {
                    navigate("/", { replace: true });
                }
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
                        <span className={styles.loginFormTitle}>Register</span>
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
                            <button className={styles.formBtn}>Submit</button>
                        </div>
                        <div className={styles.containerFormBtn}>
                            <span className={styles.registerText}>Already have an account?</span>
                            <Link className={styles.registerLink} to="/login">Log in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;