'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "../../components/Header";
import AltaPlato from "../../components/AltaPlato";
import Footer from "../../components/Footer";

const AltaPlatoPage = () => {

    const [token, setToken] = useState(null);  
    const [userId, setUserId] = useState(null);
    const router = useRouter();


    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUserId = localStorage.getItem("userId");
        if (!storedToken) {
            router.push("/login");
        } else {
            setToken(storedToken);
            setUserId(storedUserId);
        }
    }, []);

    return (
        <>
        <Header token={token} setToken={setToken} router={router} userId={userId} />
        <AltaPlato />
        <Footer />
        </>
    );
}   
export default AltaPlatoPage;