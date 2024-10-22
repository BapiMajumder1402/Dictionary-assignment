import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
const Navbar = () => {
    return (
        <nav>
            <NavLink to='/' className='logo'>
                Dictionary
            </NavLink>
            <div className='links'>
                <NavLink to='/' className='navLink'>Home</NavLink>
                <NavLink to='/table' className='navLink'>All Words</NavLink>
            </div>
        </nav>
    )
}

export default Navbar
