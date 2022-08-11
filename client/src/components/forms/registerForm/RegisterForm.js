import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from 'react';

import AuthenticationContext from '../../../lib/AuthenticationContext';

import styles from './RegisterForm.module.css';

const RegisterForm = () => {

    let navigate = useNavigate();
    const { auth, registerUser } = useContext(AuthenticationContext);

    const [serverError, setServerError] = useState({});
    const { register, formState: { errors }, handleSubmit } = useForm();


    const submitHandler = (formData) => {
        handleRegister(formData);
    }

    const handleRegister = (formData) => {

        registerUser(formData.username, formData.password, formData.firstName, formData.lastName)
            .then((result) => {
                if(result && result.isError) {
                    setServerError(result);
                }
                else {
                    navigate("/", { replace: true });
                }
            });
    }

    return (
        <div>
            <div
                className={styles.containerLogin}
            >
                <div className={styles.wrapLogin}>
                    <form onSubmit={handleSubmit(submitHandler)}  className={styles.loginForm}>
                        <span className={styles.loginFormLogo}>
                            <img src={"images/companyLogo.png"} />
                        </span>
                        <span className={styles.loginFormTitle}>Register</span>
                        {serverError.isError && <div className={styles.validationError}>An error has occured. Please try again later.</div>}
                        <div
                            className={`${styles.wrapInput}`}
                        >
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Username"
                                {...register("username", { required: true })}
                            />
                            <span className={styles.focusInput} />
                            <span className={styles.validationError}>
                            {errors.username?.type === 'required' && "Username is required"}
                            </span>
                        </div>
                        <div
                            className={`${styles.wrapInput}`}
                        >
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: true })}
                            />
                            <span className={styles.focusInput} />
                            <span className={styles.validationError}>
                            {errors.password?.type === 'required' && "Password is required"}
                            </span>
                        </div>
                        <div
                            className={`${styles.wrapInput} `}
                        >
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="First Name"
                                {...register("firstName", { required: true })}
                            />
                            <span className={styles.focusInput} />
                            <span className={styles.validationError}>
                            {errors.firstName?.type === 'required' && "First name is required"}
                            </span>
                        </div>
                        <div
                            className={`${styles.wrapInput}`}
                        >
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Last Name"
                                {...register("lastName", { required: true })}
                            />
                            <span className={styles.focusInput} />
                            <span className={styles.validationError}>
                            {errors.lastName?.type === 'required' && "Last name is required"}
                            </span>
                        </div>
                        <div className={styles.containerFormBtn}>
                            <input type="submit" className={styles.formBtn} />
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