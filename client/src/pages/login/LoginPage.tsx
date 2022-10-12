import LoginForm from "../../components/forms/loginForm/LoginForm";

const LoginPage = (): JSX.Element => {

    return (
        <>   
            <div className="main-wrapper">
                <div className="wrapper">
                    <LoginForm />
                </div>
            </div>
        </>
    );
}

export default LoginPage;