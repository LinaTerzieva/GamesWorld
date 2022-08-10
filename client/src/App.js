import { Routes, Route } from "react-router-dom";

import { AuthenticationProvider } from "./lib/AuthenticationProvider";

import './App.css';

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import Catalog from "./components/catalog/Catalog";
import Detail from "./components/detail/Detail";
import Contact from "./components/contact/Contact";

function App() {


    return (
        <div className="main">
            <AuthenticationProvider>
                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="detail/:gameId" element={<Detail />} />
                    <Route path="contact" element={<Contact />} />
                        
                </Routes>
            </AuthenticationProvider>
        </div>
    );
}

export default App;
