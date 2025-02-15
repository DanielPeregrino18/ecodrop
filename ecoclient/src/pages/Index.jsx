import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2'
import {getAllUsuarios} from '../api/usuarios.api'
function Index() {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsuarios();
        setName(data.username);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
  
    fetchData();
  }, []);
     
  return (
    <div className='h-screen'>
      <Navbar2 />
      Bienvenido {name}
    </div>
  )
}

export default Index