import RegisterForm from "../../components/forms/registerForm/RegisterForm";

const RegisterPage = (): JSX.Element => {
    return (
        <>
            <div className="main-wrapper">
                <div className="wrapper">
                    <RegisterForm />
                </div>
            </div>
        </>
    );
}

export default RegisterPage;