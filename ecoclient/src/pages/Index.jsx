import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2'
import { getUsuario } from '../api/usuarios.api'
import * as motion from "motion/react-client"


export default function Index() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const niveles = ["Novato", "Principiante", "Intermedio", "Avanzado", "Experto"];
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsuario();
      setUser(data);
    };
    fetchData();
  }, []);

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#b3e3b4' }}>
      <Navbar2 />
      <div className='px-4 py-2'>
        <div className='flex flex-row'>
          <motion.img src="imgs/icono2.jpg" whileHover={{ scale: 1.2 }} whileTap={{ scale: 2.5 }} alt="icono" className="h-15 md:h-24 bg-white border-2 rounded-full cursor-zoom-in" />
          <div className='flex flex-col justify-center pl-4'>
           <p className='text-4xl font-bold text-green-800'>Bienvenido {user.username}</p>
           <div className='flex flex-row'>
            <svg className="w-6 h-6 text-yellow-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
            </svg>
            <p>Nivel {user.nivel} - Reciclador {niveles[user.nivel-1]}</p>
           </div>
           
          </div>
        </div>
        <div className='flex flex-col md:flex-row'>
          <div className='basis-1/2 py-4 flex-col'>
            <div className='text-xl py-4 text-center font-bold'>Experiencia para nivel {user.nivel +1}</div>
            <div className="mx-6 bg-gray-200 rounded-full dark:bg-gray-700 h-5 my-4">
              <div className="bg-green-600 text-xs h-full font-medium text-green-100 text-center p-0.5 leading-none rounded-full" style={{width:(user.exp/user.metaexp*100+"%")}}> {user.exp}/{user.metaexp}</div>
            </div>
            <div className='text-xl py-2 text-center font-bold py-4'> Te falta {user.metaexp-user.exp} de experiencia para completar el siguiente icono</div>
            <div className='flex justify-center '>
              <motion.img src="imgs/icono1.png" whileHover={{ scale: 1.2 }} whileTap={{ scale: 2.5 }} alt="icono" className="h-15 md:h-24 bg-white border-2 rounded-full cursor-zoom-in" />
            </div>
          </div>
          <div className='basis-1/2 flex justify-center'>
            <div className='w-[100%] md:w-[70%] bg-gray-200 text-center border-2 rounded-lg mx-4 md:mx-20 p-4'>
              <div className='text-xl font-bold my-2 '>Saldo acumulado</div>
              <div className='text-4xl font-bold bg-white border rounded-lg my-2 py-4'>${user.saldo}</div>
              <div className='text-xl font-bold my-2 '>Dias de racha</div>
              <div className='text-4xl font-bold bg-white border rounded-lg my-2 py-4'>{user.racha} Dias</div>
              <button type="button" className="w-[100%] cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Ver Historial</button>
            </div>
          </div>
        </div>
          
        <div className='flex flex-col mt-10'>
            <div className='bg-white shadow-md rounded-lg text-center mt-2 py-2 px-8 md:mx-[7.5%]'>
              <div className='font-bold text-lg'>Depositos Totales</div>
              <div className="flex justify-center"><img src="imgs/contenedor-de-basura.gif"  alt="icono" className="h-10 w-10" /></div>
              <div className='text-start text-4xl font-bold'>{user.depTotales}</div>
              <div className='text-start text-gray-500'>{user.depSemana} depositos esta semana</div>
            </div>

            <div className='bg-white shadow-md rounded-lg text-center mt-2 py-2 px-8 md:mx-[7.5%]'>
              <div className='font-bold text-lg'>Logros Desbloqueados</div>
              <div className="flex justify-center"><img src="imgs/copa.gif"  alt="icono" className="h-10 w-10" /></div>
              <div className='text-start text-4xl font-bold'>7/12</div>
              <div className='text-start text-gray-500'>¡Proximo logro cerca!</div>
            </div>
        </div>
        {/*user.historial.map((dep, index) => (
          <div key={index}>
            <p>Fecha: {dep.fecha}</p>
            <p>Material: {dep.material}</p>
          </div>
        ))*/}
      </div>
    </div>
  )
} 