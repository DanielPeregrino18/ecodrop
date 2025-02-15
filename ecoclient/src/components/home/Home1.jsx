import React from 'react'
import * as motion from "motion/react-client"

function Home1() {
    return (
        <>
            <motion.img src="/imgs/nube.png" className='h-2 md:h-30 absolute  top-20 right-280 z-10'
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} />
            <motion.img src="/imgs/nube.png" className='h-2 md:h-34 absolute top-140 right-0 z-10'
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1.2 }} />
            <motion.img src="/imgs/nube.png" className='h-4 md:h-34  absolute top-120 left-0 z-10'
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} />
            <div className='flex flex-col md:flex-row pt-10'>
                <motion.div className='basis-1/2 flex flex-col justify-center text-center md:px-20'
                    initial={{ y: 200, scale: 0 }} animate={{ y: 0, scale: 1 }} transition={{ duration: 0.4, y: { type: "spring", visualDuration: 0.4, bounce: 0.5 } }} >
                    <div className='text-6xl font-bold'>ECODROP</div>
                    <div className='font-xl'>En ECODROP, transformamos el reciclaje en una experiencia gratificante. Nuestro dispositivo inteligente
                        facilita la clasificación de tus residuos y te premia por tu compromiso con el planeta</div>
                </motion.div>
                <motion.div className='flex justify-center'
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                    }}>
                    <div>
                        <img src="/imgs/imgHome.png" className="h-[200px] lg:h-[500px] basis-1/2 " alt="Descripción" />
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default Home1