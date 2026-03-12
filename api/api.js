import { mockLocales, mockPlatos, mockUsers } from "./mockData";

// Simula un delay de red para que se vea más real
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const register = async (username, name, password) => {
  await delay();
  const exists = mockUsers.find((u) => u.username === username);
  if (exists) throw new Error("El usuario ya existe");
  return { message: "Usuario registrado correctamente" };
};

const login = async (username, password) => {
  await delay();
  const user = mockUsers.find((u) => u.username === username);
  if (!user) throw new Error("Usuario o contraseña incorrectos");
  return {
    token: "mock-token-123",
    user,
  };
};

const getLocales = async (filters = {}) => {
  await delay();
  let results = [...mockLocales];

  if (filters.q) {
    const q = filters.q.toLowerCase();
    results = results.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q)
    );
  }
  if (filters.type) {
    results = results.filter(
      (l) => l.type.toLowerCase() === filters.type.toLowerCase()
    );
  }
  if (filters.priceRange) {
    results = results.filter(
      (l) => l.priceRange.toLowerCase() === filters.priceRange.toLowerCase()
    );
  }
  if (filters.rating) {
    results = results.filter((l) => l.rating >= Number(filters.rating));
  }
  if (filters.city) {
    results = results.filter((l) =>
      l.city.toLowerCase().includes(filters.city.toLowerCase())
    );
  }
  if (filters.zone) {
    results = results.filter((l) =>
      l.zone.toLowerCase().includes(filters.zone.toLowerCase())
    );
  }

  return results;
};

const getPlatos = async (filters = {}) => {
  await delay();
  let results = [...mockPlatos];

  if (filters.q) {
    const q = filters.q.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }
  if (filters.category) {
    results = results.filter(
      (p) => p.category.toLowerCase() === filters.category.toLowerCase()
    );
  }
  if (filters.city) {
    results = results.filter((p) =>
      p.city.toLowerCase().includes(filters.city.toLowerCase())
    );
  }
  if (filters.localId) {
    results = results.filter((p) => p.localId === Number(filters.localId));
  }
  if (filters.dateFrom) {
    results = results.filter((p) => p.createdAt >= filters.dateFrom);
  }
  if (filters.dateTo) {
    results = results.filter((p) => p.createdAt <= filters.dateTo);
  }

  return results;
};

const getPlatoById = async (id) => {
  await delay();
  const plato = mockPlatos.find((p) => p.id === Number(id));
  if (!plato) throw new Error("Plato no encontrado");
  return plato;
};

const getLocal = async (id) => {
  await delay();
  const local = mockLocales.find((l) => l.id === Number(id));
  if (!local) throw new Error("Local no encontrado");
  return local;
};

const getUser = async (id) => {
  await delay();
  const user = mockUsers.find((u) => u.id === Number(id));
  if (!user) throw new Error("Usuario no encontrado");

  return {
    ...user,
    locals: mockLocales.filter((l) => l.userId === Number(id)),
    dishes: mockPlatos.filter((p) => p.userId === Number(id)),
  };
};

const postLocal = async (local) => {
  await delay();
  const newLocal = {
    ...local,
    id: mockLocales.length + 1,
    rating: 0,
    reviews: [],
    userId: 1,
  };
  mockLocales.push(newLocal);
  return newLocal;
};

const postPlato = async (plato) => {
  await delay();
  const newPlato = {
    ...plato,
    id: mockPlatos.length + 1,
    rating: 0,
    reviews: [],
    createdAt: new Date().toISOString().split("T")[0],
    userId: 1,
  };
  mockPlatos.push(newPlato);
  return newPlato;
};

const postReview = async (id, rating, comment) => {
  await delay();
  const local = mockLocales.find((l) => l.id === Number(id));
  if (!local) throw new Error("Local no encontrado");
  const review = { id: Date.now(), rating, comment, userId: 1, userName: "Ana Pereira" };
  local.reviews.push(review);
  return review;
};

const postReviewPlato = async (id, rating, comment) => {
  await delay();
  const plato = mockPlatos.find((p) => p.id === Number(id));
  if (!plato) throw new Error("Plato no encontrado");
  const review = { id: Date.now(), rating, comment, userId: 1, userName: "Ana Pereira" };
  plato.reviews.push(review);
  return review;
};

export {
  register,
  login,
  getLocales,
  getPlatos,
  getPlatoById,
  getUser,
  postLocal,
  postPlato,
  getLocal,
  postReview,
  postReviewPlato,
};






















// const BASE_URL = "https://api-react-taller-production.up.railway.app";

// const register = async (username, name, password) => {
//     const response = await fetch(`${BASE_URL}/api/auth/register`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({username, name, password}),
//     });

//     const data = await response.json();
//     console.log("status:", response.status);
//     console.log("respuesta:", data);
//     if (!response.ok) {
//         throw new Error(data.message || "Error al registrar usuario");
//     }

//     return data;
// }

// const login = async (username , password) => {
//     const response = await fetch(`${BASE_URL}/api/auth/login`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({username, password}),
//     });

//     const data = await response.json();
//     if(!response.ok){
//         throw new Error(data.message || "Error al iniciar sesión");
//     }

//     return data;
// }

// const getLocales = async (filters = {}) => {
//     const queryParams = new URLSearchParams(filters).toString();
    
//     const request = queryParams ? `${BASE_URL}/api/locals?${queryParams}` : `${BASE_URL}/api/locals`;

//     const response = await fetch(request);
//     const data = await response.json();

//     if (!response.ok) {
//         throw new Error(data.message || "Error al obtener locales");
//     }

//     return data;
// }

// const getPlatos = async (filters = {}) => {
//     const queryParams = new URLSearchParams(filters).toString();
//     const request = queryParams ? `${BASE_URL}/api/dishes?${queryParams}` : `${BASE_URL}/api/dishes`;

//     const response = await fetch(request);
//     const data = await response.json();

//     if (!response.ok) {
//         throw new Error(data.message || "Error al obtener platos");
//     }
//     return data;
// }

// const getPlatoById = async (id) => {
//     const response = await fetch(`${BASE_URL}/api/dishes/${id}`);
//     const data = await response.json();

//     if (!response.ok) {
//         throw new Error(data.message || "Error al obtener platos");
//     }
//     return data;
// }

// const getUser = async (id) => {

//     const response = await fetch(`${BASE_URL}/api/users/${id}`)

//     const data = await response.json();
//     if (!response.ok) {
//         throw new Error(data.message || "Error al obtener usuario");
//     }

//     return data;
// }

// const postLocal = async (local) => {
//     const response = await fetch(`${BASE_URL}/api/locals`,{
//         method: "POST",
//         headers:{"Content-Type" : "application/json",
//             "Authorization" : `Bearer ${localStorage.getItem("authToken")}`
//     },
//     body: JSON.stringify(local)
//     });
//     if(!response.ok){
//         throw new Error("Error al crear el local");
//     }
//     const data = await response.json();
//     console.log("status:", response.status);
//     console.log("respuesta:", data);

//     return data;
// }

// const postPlato = async (plato) => {
//     const response = await fetch(`${BASE_URL}/api/dishes`,{
//         method: "POST",
//         headers:{"Content-Type" : "application/json",
//             "Authorization" : `Bearer ${localStorage.getItem("authToken")}`
//     },
//     body: JSON.stringify(plato)
//     });
//     if(!response.ok){
//         throw new Error("Error al crear el plato");
//     }
//     const data = await response.json();
//     return data;
// }

// const getLocal = async (id) => {
//     const response = await fetch(`${BASE_URL}/api/locals/${id}`);
//     const data = await response.json();
//     if(!response.ok){
//         throw new Error(data.message || "Error al obtener usuario");
//     }
//     return data;
// }

// const postReview = async (id, rating, comment) => {
//     const response = await fetch(`${BASE_URL}/api/locals/${id}/reviews`,{
//         method: "POST",
//         headers: {"Content-Type" : "application/json" ,
//             "Authorization" : `Bearer ${localStorage.getItem("authToken")}`   
//         },
//         body : JSON.stringify({rating , comment})
//     });

//     const data = await response.json();
//     if(!response.ok){
//         throw new Error(data.message || "Error al obtener usuario");
//     }

//     return data;
// }

// const postReviewPlato = async (id, rating, comment) => {
//     const response = await fetch(`${BASE_URL}/api/dishes/${id}/reviews`,{
//         method: "POST",
//         headers: {"Content-Type" : "application/json" ,
//             "Authorization" : `Bearer ${localStorage.getItem("authToken")}`   
//         },
//         body : JSON.stringify({rating , comment})
//     });

//     const data = await response.json();
//     if(!response.ok){
//         throw new Error(data.message || "Error al crear review del plato");
//     }

//     return data;
// }

// export { register, login, getLocales, getPlatos, getPlatoById, getUser, postLocal, postPlato, getLocal, postReview, postReviewPlato}; 