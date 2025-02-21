import React from 'react'

function CardPerfil({user}) {
    const niveles = ["Novato", "Principiante", "Intermedio", "Avanzado", "Experto"];
    return (
        <div className='border-3 mx-4 flex flex-col items-center rounded-lg py-5 bg-gray-100'>
            <img src="imgs/icono2.jpg" alt="icono" className="w-40 bg-white border-3 rounded-full cursor-pointer" />
            <div className='font-bold text-xl'>{user.username}</div>
            <div>Reciclador {niveles[user.nivel-1]}</div>
            <div className='flex flex-row'>
                <svg className="w-6 h-6 text-yellow-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <p>Nivel {user.nivel}</p>
            </div>
        </div>
    )
}

export default CardPerfil