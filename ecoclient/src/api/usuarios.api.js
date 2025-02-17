import axios from 'axios'

export const getUsuario = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post('http://localhost:8000/api/getusuario/',{}, {
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