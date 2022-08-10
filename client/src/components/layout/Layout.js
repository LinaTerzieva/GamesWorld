import { Outlet } from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";


const Contact = () => {


    return (
        <>
            <Header />
                <Outlet />
            <Footer />
        </>

    );
}

export default Contact;