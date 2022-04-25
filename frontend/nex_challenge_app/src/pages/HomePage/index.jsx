/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

import { getProducts } from "../../services/api";

import Main from '../../components/template/Main'

import jpIMG from "../../assets/img/logo3.png";

import "./style.css"



const HomePage = () => {
    const { logout } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () =>{
            const response = await getProducts();
            setProducts(response.data);
            setLoading(false);
        })();
    }, []);

    const handleLogout = () => {
        logout();
    };

    const userLogged = localStorage.getItem("user_name");
    const userActive = JSON.parse(userLogged)

    if(loading){
        return <div className="loading">Carregando...</div>
    }

    return(
    <Main icon="ship" title="Início" subtitle="MY STORE" >
        <div className='display-4'> <img src={jpIMG} alt="logo"></img> BUCCANEERS TEC STORE</div>
        <hr/>
        <h3>Bem vindo, {userActive}</h3>
        <button className="btn btn-danger" onClick={handleLogout}>Sair</button>
        <hr/>
        <div className="row">
        {products.map((product) =>(
            <div key={product.products_id} className="col-12 col-md-3">
                <div   className="card">
                    <div className="card-body">
                        <h4 className=" card-title">{product.product_name}</h4>
                        <h5 className=" card-title">$BRL:{product.product_price},00</h5>
                        <p className="card-text">{product.product_description}</p>
                        <img src={product.product_img} alt="product_image"></img>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </Main>
    )
};

export default HomePage;
    