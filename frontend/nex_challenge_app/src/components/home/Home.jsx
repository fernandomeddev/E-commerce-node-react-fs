/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Main from '../template/Main'

export default props => 
    <Main icon="home" title="Início" subtitle="Buccanners Store" >
        <div className='display-4'>Bem vindo!</div>
        <hr/>
        <p className='mb-0'>Lista de produtos a sua inteira diposição.</p>
    </Main>