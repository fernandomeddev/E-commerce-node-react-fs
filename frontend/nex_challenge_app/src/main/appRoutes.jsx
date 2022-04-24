/* eslint-disable import/no-anonymous-default-export */
import React, {useState} from "react"
import { BrowserRouter as Router,
    Route, 
    Routes, 
    } from 'react-router-dom';

import LoginPage from "../pages/LoginPage/index";
import Home from '../components/home/Home'
import User from '../pages/SignupPage/index'
import { AuthContext } from "../contexts/auth";

const AppRoutes = () => {
    const [user, setUser] = useState(null);

    const login = (user_email, user_password) => {
        console.log("login auth", {user_email, user_password});
        setUser({user_email, user_password});
    };

    const logout = () => {
        console.log('logout')
    };

    return (
        <Router>
            <AuthContext.Provider value={{authenticated: !! user, user, login, logout }}>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />}/>
                    <Route exact path="/users" element={<User />}/>
                    <Route exact path="/" element={<Home />}/>
                </Routes>
            </AuthContext.Provider>
        </Router>
    )
}

export default AppRoutes;
    