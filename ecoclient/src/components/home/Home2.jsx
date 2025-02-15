import React from 'react'
import * as motion from "motion/react-client"
import Contador from './Contador'

function Home2() {
    return (
        <>
            <div className='text-xl md:text-4xl h-[30%] flex items-center'>
                <div className='text-center w-[100%] mx-[5%] lg:mx-[20%]'>"Nuestro objetivo es impulsar el reciclaje responsable"</div>
            </div>
            <div className='flex flex-col md:flex-row h-[70%]' style={{ backgroundColor: '#b3e3b4' }}>
                <div className='flex flex-col basis-1/3 justify-center'>
                    <div className='text-center font-bold text-green-800'>
                        <Contador num={24} duracion={2} />
                        <span className='text-4xl'> KG </span>
                    </div>
                    <div className='md:px-20 pt-4 text-2xl font-bold text-center text-green-900'>
                        de residuos correctamente seprados
                    </div>
                </div>
                <div className='flex flex-col basis-1/3 justify-center'>
                    <div className='text-center font-bold text-green-800'>
                        <Contador num={75} duracion={3} />
                        <span className='text-4xl'> % </span>
                    </div>
                    <div className='md:px-20 pt-4 text-2xl font-bold text-center text-green-900'>
                        de usuarios mejoraron sus hábitos de reciclaje
                    </div>
                </div>
                <div className='flex flex-col basis-1/3 justify-center'>
                    <div className='text-center font-bold text-green-800'>
                        <Contador num={62} duracion={1.5} />
                        <span className='text-4xl'> % </span>
                    </div>
                    <div className='md:px-20 pt-4 text-2xl font-bold text-center text-green-900'>
                        de usuarios son constantes
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home2