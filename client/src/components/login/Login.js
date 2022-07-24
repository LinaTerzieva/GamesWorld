import Header from "../header/Header";
import Footer from "../footer/Footer";
import LoginForm from "./loginForm/LoginForm";

const Login = () => {

    
    return (
        <>
            <Header />
            <div className="main-wrapper">
                <div className="wrapper">
                    <LoginForm />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;