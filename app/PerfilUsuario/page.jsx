'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

import PerfilComponent from "../../components/PerfilComponent";
import Header from "../../components/Header";

const PerfilUsuario = () => {

    const [token, setToken] = useState(localStorage.getItem("authToken") || null);
    const router = useRouter();

    return (  
        <>
        <Header token={token} setToken={setToken} router={router} />
        <PerfilComponent />
        </>
    )
}

export default PerfilUsuario;