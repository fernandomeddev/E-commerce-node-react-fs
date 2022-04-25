/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import {api} from '../../services/api'

import jpIMG from "../../assets/img/logo3.png";
import Warning from "../../assets/img/warning.png"
import Check from "../../assets/img/verificado.png";

import "./style.css";

const RegisterPage = () => {
  
  const [user_name, setName] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", {user_name, user_email, user_password, confirmPassword});
        if(!user_name || !user_email || !user_password || !confirmPassword){
            return alert("Ops não foi possível realizar seu cadastro revise os campos e tente novamente!")
        }

        if(user_password !== confirmPassword){
            return alert("Ops Os campos Senha e Confirmação de senha estão diferentes");
        }

        api.post('/signup', {user_name, user_email, user_password, confirmPassword})
            .then(res => {
                console.log('sucess')
                setLoading(false)
                setRegisterMsg('sucess')
                return res;
            })
            .catch((error)=>{
                console.log('serverError')
                setLoading(false)
                setRegisterMsg('serverError')
                return JSON.stringify(error);
            })
        
        return setLoading(true) ;

    }
    if(loading){
        return (
            <div className="container-login">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden"></span>
                </div>
            </div>
            
        )
    }

    if(registerMsg === 'sucess'){
        return (
            <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                <form className="login-form" onSubmit={handleSubmit}>
                    <span className="login-form-title"><i className="fa fa-check-circle-o">Cadastro realizado com sucesso!</i></span>
                    <p></p>
                    <span className="login-form-title">
                    <img src={Check} alt="Logo" />
                    </span>

                    <div className="container-login-form-btn">
                    <a href="/login" className="btn  btn-success">Entrar</a>
                    </div>
                    <div className="text-center">
                    <span className="txt1">Cadastrar uma nova conta?</span>
                    <a className="txt2" href="/signup">
                        Cadastrar
                    </a>
                    </div>
                </form>
                </div>
            </div>
        </div>
        )
    }

    if(registerMsg === 'serverError'){
        return (
            <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                <form className="login-form" onSubmit={handleSubmit}>
                    <span className="login-form-title"><i className="fa fa-exclamation-circle">Usuário já existente no sistema!</i></span>
                    <p></p>
                    <span className="login-form-title">
                    <img src={Warning} alt="Logo" />
                    </span>

                    <div className="container-login-form-btn">
                    <a href="/login" className="btn  btn-success">Entrar</a>
                    </div>
                    <div className="text-center">
                    <span className="txt1">Cadastrar uma nova conta?</span>
                    <a className="txt2" href="/signup">
                        Cadastrar
                    </a>
                    </div>
                </form>
                </div>
            </div>
        </div>
        )
    }


    return (
        <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                <form className="login-form" onSubmit={handleSubmit}>
                    <span className="login-form-title"> Bem vindo </span>
                    <p></p>
                    <span className="login-form-title">
                    <img src={jpIMG} alt="Logo" />
                    </span>

                    <div className="wrap-input">
                    <input
                        className={user_name !== "" ? "has-val input" : "input"}
                        type="text"
                        value={user_name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Nome"></span>
                    </div>

                    <div className="wrap-input">
                    <input
                        className={user_email !== "" ? "has-val input" : "input"}
                        type="email"
                        value={user_email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Email"></span>
                    </div>

                    <div className="wrap-input">
                    <input
                        className={user_password !== "" ? "has-val input" : "input"}
                        type="password"
                        value={user_password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Senha"></span>
                    </div>

                    <div className="wrap-input">
                    <input
                        className={confirmPassword !== "" ? "has-val input" : "input"}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Confirme sua Senha"></span>
                    </div>

                    <div className="container-login-form-btn">
                    <button type="submit" className="login-form-btn">Registrar</button>
                    </div>

                    <div className="text-center">
                    <span className="txt1">Já possui conta?</span>
                    <a className="txt2" href="/login">
                        Login
                    </a>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;