import { animate, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useNavigate, Link } from 'react-router-dom';

export default function Nabvar2() {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null)
    const { height } = useDimensions(containerRef)

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (

        <div>
            <div className="relative w-screen max-w-full h-[80px] bg-accent overflow-hidden shadow-sm">
                <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef}
                    className="bg-white dark:bg-gray-900 h-[80px] w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
                >
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <Link to="/index" className="flex items-center">
                            <img src="imgs/LogoBco2.jpeg" alt="EcoLogo" className="h-5 md:h-8" />
                            <div className='text-s md:text-xl text-gray-800 hover:text-green-600 font-medium'>ECODROP</div>
                        </Link>

                        <div className="flex items-center space-x-8 hidden md:flex md:w-auto">
                            <Link to="/index" className="text-gray-800 hover:text-green-600 font-medium">
                                Inicio
                            </Link>
                            <Link to="/foundation" className="text-gray-800 hover:text-green-600 font-medium">
                                Ubicaciones
                            </Link>
                            <Link to="/about" className="text-gray-800 hover:text-green-600 font-medium">
                                Acerca de
                            </Link>
                            <Link to="/contact" className="text-gray-800 hover:text-green-600 font-medium">
                                Contacto
                            </Link>
                        </div>

                        <div className="mr-2 flex items-center space-x-1 sm:space-x-4">
                            <Link to="/perfil" className="text-gray-800 hover:text-green-600 font-medium md:mx-4">
                                Perfil
                            </Link>
                            <motion.div
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: .1 },
                                }}
                                onClick={handleLogout}
                                className="ml-1 px-1 md:px-4 py-2 text-red-600 cursor-pointer border border-red-600 rounded-full hover:bg-red-600 hover:text-white font-medium transition-colors">
                                Cerrar sesion
                            </motion.div>
                        </div>
                        <div className="md:hidden">
                            <motion.div
                                className=" fixed top-0 right-0 w-full h-[100px]"
                                variants={sidebarVariants}
                            />
                            <Navigation isOpen={isOpen} handle={handleLogout} />
                            <MenuToggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
                        </div>
                    </div>
                </motion.nav>
            </div>
        </div>
    )
}

const navVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        display: 'block',
        pointerEvents: 'auto',
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
        transitionEnd: {
            display: 'none'
        },
        pointerEvents: 'none',
    },
}

const Navigation = ({ isOpen }) => (
    <motion.ul
        className={`list-none p-6 m-0 fixed top-0 right-0 w-full font-medium text-xl bg-gray-100 ${isOpen ? 'pointer-events-auto h-[370px]' : 'pointer-events-none invisible'
            }`}
        variants={navVariants}
    >
        <MenuItem url={"/index"} name={"Inicio"} />
        <MenuItem url={"/foundation"} name={"Ubicaciones"} />
        <MenuItem url={"/aboutus"} name={"Acerca de"} />
        <MenuItem url={"/contact"} name={"Contacto"} />
        <MenuItem url={"/perfil"} name={"Perfil"} />
        <BtnLogout />
    </motion.ul>
)

const itemVariants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            x: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        x: 50,
        opacity: 0,
        transition: {
            x: { stiffness: 1000 },
        },
    },
}

const BtnLogout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <motion.li
            className="flex items-center justify-center p-0 m-0 list-none mb-5 cursor-pointer hover:bg-green-600 hover:text-white"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <button className="" onClick={handleLogout}>
                <div>Cerrar Sesion</div>
            </button>
        </motion.li>
    )
}

const MenuItem = ({ url, name }) => {
    return (
        <motion.li
            className="flex items-center justify-center p-0 m-0 list-none mb-5 cursor-pointer hover:bg-green-600 hover:text-white"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link to={url}>
                <div className="rounded-md w-full h-10 flex-1 mr-5 pl-5 " >
                    <div>{name}</div>
                </div>
            </Link>
        </motion.li>
    )
}

const sidebarVariants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(30px at calc(100% - 40px) 40px)",
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
}

const Path = ({ variants, ...props }) => (
    <motion.path
        className="fill-transparent stroke-[3] stroke-[hsl(0,0%,18%)]"
        strokeLinecap="round"
        variants={variants}
        {...props}
    />
)

const MenuToggle = ({ toggle, isOpen }) => (
    <button
        className="outline-none border-none select-none cursor-pointer absolute top-[18px] right-[2px] w-[50px] h-[50px] rounded-full bg-transparent"
        style={isOpen ? { position: 'fixed'} : {}}
        onClick={toggle}
    >
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                }}
            />
        </svg>
    </button>
)

const useDimensions = (ref) => {
    const dimensions = useRef({ width: 0, height: 0 })

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth
            dimensions.current.height = ref.current.offsetHeight
        }
    }, [ref])

    return dimensions.current
}