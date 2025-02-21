import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { loginApi } from '../api/login.api'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import OjoAbierto from '../components/icons/OjoAbierto'
import OjoCerrado from '../components/icons/OjoCerrado'

const SignupSchema = Yup.object().shape({
    password: Yup.string().required('Requerido'),
    email: Yup.string().email('Email Invalido').required('Requerido'),
});

export default function LoginForm({ setIsAuthenticate }) {
    const navigate = useNavigate();
    const [showP, setShowP] = useState(false);

    return (
        <>
            <div className=" pt-10">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                <img className="w-8 h-8 mr-2" src="imgs/LogoBco2.jpeg" alt="logo" />
                                Ecodrop
                            </a>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Inicia sesion con tu cuenta
                            </h1>
                            <Formik
                                initialValues={{
                                    password: '',
                                    email: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={async (values) => {
                                    if (await loginApi(values.email, values.password)) {
                                        setIsAuthenticate(true);
                                        navigate('/index');
                                    } else {
                                        toast.error("Usuario o Contraseña inválidos");
                                    }
                                }}>
                                {({ errors, touched }) => (
                                    <Form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                                            <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@ejemplo.com" required="" />
                                            {errors.email && touched.email && (
                                                <div className='text-[9px] text-red-600'>{errors.email}</div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                            <div className='relative w-full'>
                                                <Field type={showP ? "text" : "password"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                                <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center"
                                                    onClick={() => setShowP((s) => !s)}>
                                                    {showP ? (<OjoAbierto />) : (<OjoCerrado />)}
                                                </button>
                                            </div>
                                            {errors.password && touched.password && (
                                                <div className='text-[9px] text-red-600'>{errors.password}</div>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recordarme</label>
                                                </div>
                                            </div>
                                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</a>
                                        </div>
                                        <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Iniciar sesion</button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            ¿Aun no tienes cuenta? <Link to={"/registro"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrate</Link>
                                        </p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}