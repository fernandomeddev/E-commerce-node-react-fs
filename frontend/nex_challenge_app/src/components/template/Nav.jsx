/* eslint-disable import/no-anonymous-default-export */
import './Nav.css'
import React from 'react'

export default props =>
    <aside className='menu-area'>
        <nav className='menu'>
            <a href='/'>
                <i className='fa fa-home'></i>
            </a>
            <a href='/users' to='/users'>
                <i className='fa fa-users'></i>
            </a>
        </nav>
    </aside>