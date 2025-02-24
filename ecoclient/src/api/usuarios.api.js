import axios from 'axios'

export const getUsuario = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post('https://ecodrop.onrender.com/api/getusuario/',{}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`, 
              },
        })
        return response.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

export const getUsuarioPerfil = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post('https://ecodrop.onrender.com/api/getusuarioperfil/',{}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`, 
              },
        })
        return response.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

export const actualizarPerfil = async (nombre, telefono, password) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put('https://ecodrop.onrender.com/api/actualizarperfil/',{
            "username":nombre,
            "telefono":telefono,
            "password":password
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`, 
              },
        })
        return response.data.mensaje;
    } catch (error) {
        const errorData = JSON.parse(error.request.response);
        throw errorData.error;
    }
}

export const actualizarPassword = async (newPassword, oldPassword) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put('https://ecodrop.onrender.com/api/actualizarpass/',{
            "newPassword":newPassword,
            "oldPassword":oldPassword
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`, 
              },
        })
        return response.data.mensaje;
    } catch (error) {
        const errorData = JSON.parse(error.request.response);
        throw errorData.error;
    }
}