import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2'
import { getUsuario } from '../api/usuarios.api'

export default function Index() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [saldo, setSaldo] = useState(0);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
        const data = await getUsuario();
        setName(data.username);
        setSaldo(data.saldo);
        setHistorial(data.historial);
    };
    fetchData();
  }, []);

  return (
    <div className='h-screen'>
      <Navbar2 />
      <div>
        <p className='text-2xl font-bold text-green-800'>Bienvenido {name}</p>
        <div className='flex flex-row'>
          <div className='basis-2/3'>
                hola
          </div>
          <div className='basis-1/3 flex justify-center'>
            <div className='w-60 bg-green-200 text-center border rounded-lg p-4'>
              <p className='text-xl font-bold'>Puntos</p>
              {saldo}
            </div>
          </div>
        </div>
        
        {historial.map((dep, index) => (
          <div key={index}>
            <p>Fecha: {dep.fecha}</p>
            <p>Material: {dep.material}</p>
          </div>
        ))}
      </div>
    </div>
  )
}9