import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginFrom';
import { Link } from 'react-router-dom';
import NavbarI from '../components/NavbarI';

export default function Login({ setIsAuthenticate }) {

    return (
        <div className=' h-screen bg-gray-100'>
            <NavbarI />
            <LoginForm setIsAuthenticate={setIsAuthenticate} />
            {/*<Link to={"/registro"}>Registrate</Link>*/}

        </div>
    )
}