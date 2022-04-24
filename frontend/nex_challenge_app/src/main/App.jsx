/* eslint-disable import/no-anonymous-default-export */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'

import AppRoutes from './appRoutes';

function App(){
    return (
        <div className='app'>
            <AppRoutes />
        </div>
    )
}

export default App;




