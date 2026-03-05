'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "../../components/Header";
import AltaLocal from "../../components/AltaLocal";



const AltaLocalPage = () =>{

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const router = useRouter();
    
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if(!storedToken && !userId){
            router.push("/login");
            return;
        }

        setToken(storedToken);
        setUserId(userId);
    }, [])

    return(
        <>
        <Header token={token} setToken={setToken} router={router} userId={userId} />
        <AltaLocal />
        </>
    )
}

export default AltaLocalPage;