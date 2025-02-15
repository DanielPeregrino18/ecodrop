import { useEffect } from 'react'
import RegistroForm from '../components/RegistroForm'
//import { getAllUsuarios } from '../api/usuarios.api'
import { Link } from 'react-router-dom'
import NavbarI from '../components/NavbarI';
import Footer from '../components/Footer';

function Registro() {
    /*useEffect(() => {
           const loadUsuarios = async () => {
               try {
                   const response = await getAllUsuarios();
                   //console.log(response)
               } catch (error) {
                   console.error('Error al cargar usuarios:', error)
               }
           }
           
           loadUsuarios()
       }, [])*/
    return (
        <>
            <div className='bg-gray-100 min-h-screen'>
                <NavbarI />
                <div className=' md:pt-2 flex justify-center'>

                    <div className='md:w-[70%]'><RegistroForm /></div>
                </div>
                {/*<Link to={"/login"}>Ya tienes cuenta?</Link>*/}

            </div>
        </>
    )
}

export default Registro