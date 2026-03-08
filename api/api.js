
const BASE_URL = "https://api-react-taller-production.up.railway.app";

const register = async (username, name, password) => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, name, password}),
    });

    const data = await response.json();
    console.log("status:", response.status);
    console.log("respuesta:", data);
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

const getPlatos = async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const request = queryParams ? `${BASE_URL}/api/dishes?${queryParams}` : `${BASE_URL}/api/dishes`;

    const response = await fetch(request);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al obtener platos");
    }
    return data;
}

const getPlatoById = async (id) => {
    const response = await fetch(`${BASE_URL}/api/dishes/${id}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al obtener platos");
    }
    return data;
}

const getUser = async (id) => {

    const response = await fetch(`${BASE_URL}/api/users/${id}`)

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Error al obtener usuario");
    }

    return data;
}

const postLocal = async (local) => {
    const response = await fetch(`${BASE_URL}/api/locals`,{
        method: "POST",
        headers:{"Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("authToken")}`
    },
    body: JSON.stringify(local)
    });
    if(!response.ok){
        throw new Error("Error al crear el local");
    }
    const data = await response.json();
    console.log("status:", response.status);
    console.log("respuesta:", data);

    return data;
}

const postPlato = async (plato) => {
    const response = await fetch(`${BASE_URL}/api/dishes`,{
        method: "POST",
        headers:{"Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("authToken")}`
    },
    body: JSON.stringify(plato)
    });
    if(!response.ok){
        throw new Error("Error al crear el plato");
    }
    const data = await response.json();
    return data;
}

const getLocal = async (id) => {
    const response = await fetch(`${BASE_URL}/api/locals/${id}`);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || "Error al obtener usuario");
    }
    return data;
}

const postReview = async (id, rating, comment) => {
    const response = await fetch(`${BASE_URL}/api/locals/${id}/reviews`,{
        method: "POST",
        headers: {"Content-Type" : "application/json" ,
            "Authorization" : `Bearer ${localStorage.getItem("authToken")}`   
        },
        body : JSON.stringify({rating , comment})
    });

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || "Error al obtener usuario");
    }

    return data;
}

const postReviewPlato = async (id, rating, comment) => {
    const response = await fetch(`${BASE_URL}/api/dishes/${id}/reviews`,{
        method: "POST",
        headers: {"Content-Type" : "application/json" ,
            "Authorization" : `Bearer ${localStorage.getItem("authToken")}`   
        },
        body : JSON.stringify({rating , comment})
    });

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || "Error al crear review del plato");
    }

    return data;
}

export { register, login, getLocales, getPlatos, getPlatoById, getUser, postLocal, postPlato, getLocal, postReview, postReviewPlato}; 