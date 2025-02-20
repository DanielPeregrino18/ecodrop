import { useEffect, useState } from 'react'
import OjoCerrado from '../icons/OjoCerrado';
import OjoAbierto from '../icons/OjoAbierto';

export default function CambiarPass() {
    const [showPassword, setShowPassword] = useState([false, false, false]);


    return (
        <div className='border-3 mx-4 mt-2 flex flex-col items-center rounded-lg py-5 bg-gray-100 p-4'>
            <div className='text-xl font-semibold'>Actualizar contraseña</div>
            <div className="w-[100%] mt-2">
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña nueva</label>
                <div className='flex flex-row'>
                    <input type={showPassword[0] ? "text" : "password"} id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    <button type="button" className="bg-gray-200 flex rounded-r-lg items-center px-3 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(prev => prev.map((value, index) => index === 0 ? !value : value))}>
                        {showPassword[0] ? (<OjoAbierto />) : (<OjoCerrado />)}
                    </button>
                </div>
            </div>
            <div className="w-[100%] mt-2">
                <label htmlFor="confPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar contraseña nueva</label>
                <div className='flex flex-row'>
                    <input type={showPassword[1] ? "text" : "password"} id="confPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    <button type="button" className="bg-gray-200 flex rounded-r-lg items-center px-3 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(prev => prev.map((value, index) => index === 1 ? !value : value))}>
                        {showPassword[1] ? (<OjoAbierto />) : (<OjoCerrado />)}
                    </button>
                </div>    
            </div>
            <div className="w-[100%] mt-2">
                <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña anterior</label>
                
                <div className='flex flex-row'>
                    <input type={showPassword[2] ? "text" : "password"} id="oldPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    <button type="button" className="bg-gray-200 flex rounded-r-lg items-center px-3 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(prev => prev.map((value, index) => index === 2 ? !value : value))}>
                        {showPassword[2] ? (<OjoAbierto />) : (<OjoCerrado />)}
                    </button>
                </div>  
            </div>
            <button type="button" className="w-[100%] ml-2 mt-2 cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cambiar username</button>
        </div>
    )
}