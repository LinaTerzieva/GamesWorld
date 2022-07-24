import { Routes, Route } from "react-router-dom";

import './App.css';

import Home from "./components/home/Home";
import Login from "./components/login/Login";

function App() {
    return (
        <div className="main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
