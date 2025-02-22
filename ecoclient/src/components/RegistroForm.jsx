import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { registroApi } from '../api/login.api';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OjoAbierto from '../components/icons/OjoAbierto'
import OjoCerrado from '../components/icons/OjoCerrado'

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Muy corto!')
        .max(20, 'Muy Largo!')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .required('Requerido'),
    email: Yup.string().email('Email Invalido').required('Requerido'),
    name: Yup.string()
        .matches(/^[a-zA-Z0-9ÀàáéíóúÁÉÍÓÚÑñ]*$/, 'Solo se permiten letras y números')
        .min(2, 'Muy corto!')
        .max(20, 'Muy largo')
        .required('Requerido'),
    passwordConf: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Requerido'),
    tandc: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions"),
});

export default function RegistroForm({ setIsAuthenticate }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState([false, false]);
    return (
        <>
            <div className="flex md:flex-row">
                <div className="flex flex-col items-end justify-center py-8 mx-auto lg:py-0 md:basis-1/2 ">
                    <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 pt-2 pl-4 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="imgs/LogoBco2.jpeg" alt="logo" />
                            Ecodrop
                        </a>
                        <div className="px-6 py-3 space-y-4 md:space-y-6 sm:px-8 sm:pb-3">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Crea tu cuenta
                            </h1>
                            <Formik
                                initialValues={{
                                    password: '',
                                    email: '',
                                    name: '',
                                    passwordConf: '',
                                    tandc: false,
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={async (values) => {
                                    const res = await registroApi(values.name, values.email, values.password);
                                    if (res === "exito") {
                                        setIsAuthenticate(true);
                                        navigate("/index")
                                    } else {
                                        toast.error(res.error);
                                    }
                                }
                                }>
                                {({ errors, touched }) => (
                                    <Form className="space-y-3 md:space-y-5">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de usuario:</label>
                                            <Field type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jhon_doe" required="" />
                                            {errors.name && touched.name && (
                                                <div className='text-[9px] text-red-600'>{errors.name}</div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre@ejemplo.com" required="" />
                                            {errors.email && touched.email && (
                                                <div className='text-[9px] text-red-600'>{errors.email}</div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                            <div className='relative z-10 w-full'>
                                                <Field type={showPassword[0] ? "text" : "password"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                                <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center"
                                                    onClick={() => setShowPassword(prev => prev.map((value, index) => index === 0 ? !value : value))}>
                                                    {showPassword[0] ? (<OjoAbierto />) : (<OjoCerrado />)}
                                                </button>
                                            </div>
                                            {errors.password && touched.password && (
                                                <div className='text-[9px] text-red-600'>{errors.password}</div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="passwordConf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirma tu contraseña</label>
                                            <div className='relative w-full'>
                                                <Field type={showPassword[1] ? "text" : "password"} name="passwordConf" id="passwordConf" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                                <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center"
                                                    onClick={() => setShowPassword(prev => prev.map((value, index) => index === 1 ? !value : value))}>
                                                    {showPassword[1] ? (<OjoAbierto />) : (<OjoCerrado />)}
                                                </button>
                                            </div>
                                            {errors.passwordConf && touched.passwordConf && (
                                                <div className='text-[9px] text-red-600'>{errors.passwordConf}</div>
                                            )}
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <Field type="checkbox" name="tandc" id="tandc" className="form-check-input w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="tandc" className="font-light text-gray-500 dark:text-gray-300">Yo acepto los <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terminos y condiciones</a></label>
                                            </div>
                                        </div>
                                        {errors.tandc && touched.tandc && (
                                            <div className='text-[9px] text-red-600'>{errors.tandc}</div>
                                        )}
                                        <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Crear cuenta</button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            ¿Ya tienes una cuenta? <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Inicio de sesion</Link>
                                        </p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className='basis-1/2 flex-col items-center justify-center hidden md:flex rounded-lg shadow-lg' style={{ backgroundColor: "#16bf7f" }}>
                    <img src="imgs/registroImg.gif" className='' />
                </div>
            </div>
        </>
    );
}