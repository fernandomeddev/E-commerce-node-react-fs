/* eslint-disable import/no-anonymous-default-export */
import React, {useContext} from "react"
import { BrowserRouter as Router,
    Navigate,
    Route, 
    Routes, 
    } from 'react-router-dom';

import LoginPage from "../pages/LoginPage/index";
import Home from '../pages/HomePage/index'
import User from '../pages/RegisterPage/index'
import { AuthProvider, AuthContext } from "../contexts/auth";

const AppRoutes = () => {
    const Private = ({children}) => {
        const { authenticated, loading } = useContext(AuthContext);

        if(loading){
            //console.log('carregando...')
            return <div className="loading">Carregando...</div>
        }

        if(!authenticated){
            //console.log('saiu...')
            return <Navigate to="/login" />
        }
        //console.log('carregou...')
        return children;
    };
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />}/>
                    <Route exact path="/signup" element={<User />}/>
                    <Route exact path="/" element={<Private><Home /></Private>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;
    