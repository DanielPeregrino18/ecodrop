import axios from 'axios'

export const getAllUsuarios = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post('http://localhost:8000/profile',{}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`, 
              },
        })
        console.log(response);
        return response.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}