/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

import { getProducts } from "../../services/api";

import Main from '../../components/template/Main'



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

    if(loading){
        return <div className="loading">Carregando...</div>
    }

    return(
    <Main icon="home" title="Início" subtitle="MY STORE" >
        <div className='display-4'>Bem vindo!</div>
        <hr/>
        <p className='mb-0'>Uma Lista Completa de produtos a sua inteira diposição.</p>
        <hr/>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        <hr/>
        <ul>
            {products.map((product) => (
                <li key={product.products_id}>
                    {product.product_name} - {product.product_price}
                </li>
            ))}
        </ul>
        
    </Main>
    )
};

export default HomePage;
    