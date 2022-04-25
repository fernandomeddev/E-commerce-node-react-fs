/* eslint-disable no-unused-vars */
import React, {useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import {api, createSession} from '../services/api'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false)

    useEffect(()=>{
      const recoveredUser = localStorage.getItem('user_email');
      const token = localStorage.getItem('token');

      if(recoveredUser){
          setUser(JSON.parse(recoveredUser));
          api.defaults.headers.Authorization = `Bearer ${token}`;
      }

      setLoading(false);
    }, []);

    const login = async (user_email, user_password) => {
        const response = await createSession( user_email, user_password)
    
        const loggedUser = response.data.user_email
        const loggedUserName = response.data.user_name
        const token = response.data.token;
            
        localStorage.setItem('user_email', JSON.stringify(loggedUser));
        localStorage.setItem('user_name', JSON.stringify(loggedUserName));
        localStorage.setItem('token', token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser);
        navigate("/");
    };

    const logout = () => {
        
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_name");
        localStorage.removeItem("token");

        api.defaults.headers.Authorization = null;

        setUser(null);
        navigate("/login")
    };

    return (
        <AuthContext.Provider 
        value={{authenticated: !! user, user, loading, serverError, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}