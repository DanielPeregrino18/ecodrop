import LoginForm from '../components/LoginFrom';
import NavbarI from '../components/NavbarI';

export default function Login({ setIsAuthenticate }) {

    return (
        <div className=' h-screen bg-gray-100'>
            <NavbarI />
            <LoginForm setIsAuthenticate={setIsAuthenticate} />
        </div>
    )
}