import React from 'react'
import Navbar2 from '../components/Navbar2';
import { Link } from 'react-router-dom';

export default function NotFoundAuth() {
  return (
    <div className='' style={{ backgroundColor: '#b3e3b4' }}>
      <Navbar2 />
      <div className='flex flex-col items-center'>
        <div className='text-8xl font-bold my-2'>Oops!</div>
        <div className='text-6xl font-bold my-2'>¡Algo salio mal!</div>
        <div className='text-xl my-2 font-semibold'>No te preocupes nuestro equipo esta aqui para ayudarte</div>
        <div className='flex flex-row justify-around'>
          <Link to={"/index"} className="w-30 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center">
            Inicio
          </Link>
          <Link to={"/index"} className="w-30 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center">
            Contacto
          </Link>
          <Link to={"/index"} className="w-30 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center">
            Acerca de
          </Link>
        </div>
      </div>
    </div>
  )
}