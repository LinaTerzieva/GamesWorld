import { Routes, Route } from "react-router-dom";

import { AuthenticationProvider } from "./lib/AuthenticationProvider";

import './App.css';

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";


function App() {


    return (
        <div className="main">
            <AuthenticationProvider>
                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                </Routes>
            </AuthenticationProvider>
        </div>
    );
}

export default App;
