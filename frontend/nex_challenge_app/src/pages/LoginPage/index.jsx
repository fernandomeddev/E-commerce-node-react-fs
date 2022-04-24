/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import jpIMG from "../../assets/img/logo3.png";

import "./index.css";

const LoginPage = () => {
  const {login} = useContext(AuthContext);
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", {user_email, user_password});
    login(user_email, user_password);
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;