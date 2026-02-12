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

export { register, login };