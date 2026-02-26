const BASE_URL = "https://api-react-taller-production.up.railway.app";

const register = async (username, name, password) => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, name, password}),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Error al registrar usuario");
    }

    return data;
}

const login = async (username , password) => {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
    });

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || "Error al iniciar sesión");
    }

    return data;
}

const getLocales = async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    
    const request = queryParams ? `${BASE_URL}/api/locals?${queryParams}` : `${BASE_URL}/api/locals`;

    const response = await fetch(request);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al obtener locales");
    }

    return data;
}

const getUser = async (id) => {

    const response = await fetch(`${BASE_URL}/api/users/${id}`)

    const data = await response.json();

    return data;
}

export { register, login, getLocales, getUser }; 