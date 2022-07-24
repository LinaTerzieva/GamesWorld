import Header from "../header/Header";
import Footer from "../footer/Footer";

import RegisterForm from "./registerForm/RegisterForm";

const Register = () => {
    return (
        <>
            <Header />
            <div className="main-wrapper">
                <div className="wrapper">
                    <RegisterForm />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;