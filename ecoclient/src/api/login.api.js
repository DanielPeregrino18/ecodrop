import axios  from "axios";

export const loginApi = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8000/login', {
            email,
            password
        });

        if (!response.data.token) {
            console.error('No se recibió token en la respuesta');
            return false;
        }

        localStorage.setItem("token", response.data.token);

        return true;
    } catch (error) {
        console.error('Error en login:', error.response?.data || error.message);
        localStorage.removeItem("token"); 
        return false;
    }
}

export const registroApi = async (nombre, email, password) => {
    try {
        const response = await axios.post('http://localhost:8000/register', {
            email: email,
            username: nombre,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            return "exito" ;
        }else{
            return response.data;
        }
    } catch (error) {
       console.log(error) 
       
    }
}