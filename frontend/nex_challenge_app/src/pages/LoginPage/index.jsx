/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import jpIMG from "../../assets/img/logo3.png";
import Warning from "../../assets/img/warning.png";
import Check from "../../assets/img/verificado.png";

import "./style.css";

const LoginPage = () => {
  const {login} = useContext(AuthContext);
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [validateLogin, setValidateLogin] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("submit", {user_email, user_password});
    if(!user_email){
      return alert('Informe um Email de Usuário válido!')
    }

    if(!user_password){
     return alert('Informe sua senha');
    }

    login(user_email, user_password)
      .catch(() => {
        return setValidateLogin('userNotExists')
      })
  }

  if(validateLogin === "success"){
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
  if(validateLogin === "userNotExists"){
    return (
      <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                <form className="login-form" onSubmit={handleSubmit}>
                    <span className="login-form-title"><i className="fa fa-exclamation-circle">Usuário Não encontrado</i></span>
                    <p></p>
                    <span className="login-form-title">
                    <img src={Warning} alt="Logo" />
                    </span>

                    <div className="container-login-form-btn">
                    <a href="/login" className="btn  btn-success">Voltar</a>
                    </div>
                    <div className="text-center">
                    <span className="txt1">não possui uma conta?</span>
                    <a className="txt2" href="/signup">
                        Criar Conta.
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
              <img src={jpIMG} alt="Jovem Programador" />
            </span>

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
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button type="submit" className="login-form-btn">Login</button>
            </div>

            <div className="text-center">
              <span className="txt1">Não possui conta? </span>
              <a className="txt2" href="/signup">
                Criar conta
              </a>
            </div>
            <p className="txt1 text-center">desenvolvido por Fernando Medeiros</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;