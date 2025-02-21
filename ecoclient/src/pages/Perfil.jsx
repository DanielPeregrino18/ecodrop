
import Navbar2 from '../components/Navbar2';
import CambiarUser from '../components/perfil/CambiarUser';
import CambiarPass from '../components/perfil/CambiarPass';
import { getUsuarioPerfil } from '../api/usuarios.api';
import { useState,useEffect } from 'react';
import CardPerfil from '../components/perfil/CardPerfil';


export default function Perfil() {
  const [user, setUser] = useState({});
   useEffect(() => {
      const fetchData = async () => {
        const data = await getUsuarioPerfil();
        setUser(data);
      };
      fetchData();
    }, []);

  return (
    <div className='' style={{ backgroundColor: '#b3e3b4' }}>
      <Navbar2 />
      <div className='text-8xl font-bold text-center py-4'>
        Perfil
      </div>
      <div className='flex flex-col md:flex-row md:mx-30 py-5'>
        <div className='md:basis-2/8 mb-2'>
          <CardPerfil user={user}/>
        </div>
        <div className='md:basis-6/8'>
          <CambiarUser user={user} />
          <CambiarPass />
        </div>
      </div>
    </div>
  )
}