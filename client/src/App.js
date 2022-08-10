import { Routes, Route } from "react-router-dom";

import { AuthenticationProvider } from "./lib/AuthenticationProvider";

import './App.css';

import Layout from "./components/layout/Layout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ProfilePage from "./pages/profile/ProfilePage";
import CatalogPage from "./pages/catalog/CatalogPage";
import DetailPage from "./pages/detail/DetailPage";
import ContactPage from "./pages/contact/ContactPage";

function App() {


    return (
        <div className="main">
            <AuthenticationProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="catalog" element={<CatalogPage />} />
                        <Route path="detail/:gameId" element={<DetailPage />} />
                        <Route path="contact" element={<ContactPage />} />
                    </Route>         
                </Routes>
            </AuthenticationProvider>
        </div>
    );
}

export default App;
