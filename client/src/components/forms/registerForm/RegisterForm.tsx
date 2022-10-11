import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from "react-hook-form";

import AuthenticationContext from '../../../lib/AuthenticationContext';

import styles from './RegisterForm.module.css';
import { AuthContextType, ServerError } from '../../../lib/types';
import { isServerError } from '../../../lib/helpers';

interface IFormInputs {
    username: string
    password: string
    firstName: string
    lastName: string
}

const RegisterForm = () => {

    let navigate = useNavigate();
    const { registerUser } = useContext(AuthenticationContext) as AuthContextType;

    const [serverError, setServerError] = useState<ServerError | { isError: boolean }>({
        errorCode: 0,
        errorMessage: "",
        isError: false
    });

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();

    const submitHandler: SubmitHandler<IFormInputs> = (formData) => {
        handleRegister(formData);
    }

    const handleRegister = (formData: IFormInputs): void => {

        registerUser(formData.username, formData.password, formData.firstName, formData.lastName)
            .then((result) => {
                if (result && result.isError) {
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
                    <form onSubmit={handleSubmit(submitHandler)} className={styles.loginForm}>
                        <span className={styles.loginFormLogo}>
                            <img src={"images/companyLogo.png"} />
                        </span>
                        <span className={styles.loginFormTitle}>Register</span>
                        {serverError.isError && isServerError(serverError) && <div className={styles.validationError}>{serverError.errorMessage}.</div>}
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