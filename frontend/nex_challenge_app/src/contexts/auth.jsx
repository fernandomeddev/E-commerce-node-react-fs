/* eslint-disable no-unused-vars */
import React, {useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import {api, createSession, createUser} from '../services/api'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      const recoveredUser = localStorage.getItem('user_email');
      const token = localStorage.getItem('token');

      if(recoveredUser){
          setUser(JSON.parse(recoveredUser));
          api.defaults.headers.Authorization = `Bearer ${token}`;
      }

      setLoading(false);
    }, []);


    const signup = async (user_name, user_email, user_password, confirmPassword) => {
        const response = await createUser(user_name, user_email, user_password, confirmPassword)
    }


    const login = async (user_email, user_password) => {
        const response = await createSession( user_email, user_password)
    
        const loggedUser = response.data.user_email
        const token = response.data.token;
            
        localStorage.setItem('user_email', JSON.stringify(loggedUser));
        localStorage.setItem('token', token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser);
        navigate("/");
    };

    const logout = () => {
        
        localStorage.removeItem("user_email");
        localStorage.removeItem("token");

        api.defaults.headers.Authorization = null;

        setUser(null);
        navigate("/login")
    };

    return (
        <AuthContext.Provider 
        value={{authenticated: !! user, user, loading, login, logout, signup }}
        >
            {children}
        </AuthContext.Provider>
    )
}