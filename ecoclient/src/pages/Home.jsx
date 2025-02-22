import NavbarI from '../components/NavbarI';
import * as motion from "motion/react-client"
import Home1 from '../components/home/home1';
import Home2 from '../components/home/Home2';

export default function Home() {
  const InViewVariants = {
    offscreen: {
      x: 400,
    },
    onscreen: {
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 3
      }
    }
  }

  const textVariants = {
    offscreen: {
      x: -400,
      scale:.5,
    },
    onscreen: {
      x: 0,
      scale:1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 3
      }
    }
  }

  return (
    <>
      <div style={{ backgroundColor: '#b3e3b4' }} className='h-screen'>
        <motion.div initial={{ y: -200 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}><NavbarI /></motion.div>
        <Home1 />
      </div>
      <div className='min-h-screen bg-green-800 flex flex-col md:flex-row'>
        <div className="relative w-full md:w-2/3 bg-white md:transform md:-skew-x-12 flex justify-center items-center">
          <motion.div className="p-8 text-center md:text-left md:ml-12 max-w-md"  initial="offscreen"
            whileInView="onscreen" viewport={{ amount: 0.02 }}>
            <motion.div className='text-lg md:text-4xl text-green-800 font-extrabold'
              variants={textVariants}>
              Recicla con nosotros, ayuda al medio ambiente y gana recompensas.
            </motion.div>
          </motion.div>
        </div>
        <div className='w-full md:w-1/3 flex justify-center items-center p-8 md:p-0 overflow-hidden'>
          <motion.div
            className='w-full max-w-[200px] md:max-w-[300px]'
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.3 }}
          >
            <motion.img
              variants={InViewVariants}
              src='/imgs/telefono.png'
              className='w-full h-auto object-contain'
            />
          </motion.div>
        </div>
      </div>
      <div className='md:h-screen'>
        <Home2 />
      </div>

    </>
  )
}

