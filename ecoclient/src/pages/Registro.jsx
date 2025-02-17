import RegistroForm from '../components/RegistroForm'
import NavbarI from '../components/NavbarI';

function Registro({ setIsAuthenticate }) {
    return (
        <>
            <div className='bg-gray-100 min-h-screen'>
                <NavbarI />
                <div className=' md:pt-2 flex justify-center'>
                    <div className='md:w-[70%]'><RegistroForm setIsAuthenticate={setIsAuthenticate} /></div>
                </div>
            </div>
        </>
    )
}

export default Registro