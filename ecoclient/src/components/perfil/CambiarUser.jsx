import { useState } from 'react'
import OjoCerrado from '../icons/OjoCerrado';
import OjoAbierto from '../icons/OjoAbierto';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { actualizarPerfil } from '../../api/usuarios.api'
import { toast } from 'react-hot-toast'

const editUserSquema = Yup.object().shape({
    username: Yup.string()
        .matches(/^[a-zA-Z0-9ÀàáéíóúÁÉÍÓÚÑñ]*$/, 'Solo se permiten letras y números')
        .min(2, 'Muy corto!')
        .max(20, 'Muy largo')
        .required('Requerido'),
    telefono: Yup.string()
        .matches(/^\d+$/, 'Solo se permiten números')
        .test('len', 'El teléfono debe tener 0 o 10 dígitos', val => 
            !val || val.length === 0 || val.length === 10
        ),
    password: Yup.string().required('Requerido'),
});

export default function CambiarUser({ user }) {
    const [showP, setShowP] = useState(false);
    
    return (
        <div className='border-3 mx-4 flex flex-col items-center rounded-lg py-5 bg-gray-100 p-4'>

            <Formik
                initialValues={{
                    username: user.username || '',
                    telefono: user.telefono || '',
                    password: '',
                }}
                enableReinitialize={true}
                validationSchema={editUserSquema}
                onSubmit={async (values) => {
                    try{
                        var mensaje = await actualizarPerfil(values.username, values.telefono, values.password);
                        toast.success(mensaje);
                    }catch(error){
                        toast.error(error);
                    }
                    }}>
                {({ errors, touched }) => (
                    <Form className='w-full'>
                        <div className='text-xl font-semibold'>Actualizar informacion del perfil</div>
                        <div className='w-[100%] mt-2'>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Actualizar nombre de usuario</label>
                            <Field type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {errors.username && touched.username && (
                                <div className='text-[9px] text-red-600'>{errors.username}</div>
                            )}
                        </div>
                        <div className='w-[100%] mt-2'>
                            <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
                            <Field type="text" name="telefono" id="telefono" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {errors.telefono && touched.telefono && (
                                <div className='text-[9px] text-red-600'>{errors.telefono}</div>
                            )}
                        </div>
                        <div className="w-[100%] mt-2">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <div className='flex flex-row'>
                                <Field type={showP ? "text" : "password"} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <button type="button" className="bg-gray-200 flex rounded-r-lg items-center px-3 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowP((s) => !s)}>
                                    {showP ? (<OjoAbierto />) : (<OjoCerrado />)}
                                </button>
                            </div>
                            {errors.password && touched.password && (
                                    <div className='text-[9px] text-red-600'>{errors.password}</div>
                                )}
                        </div>
                        <button type="submit" className="w-[100%] mt-2 cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cambiar username</button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}