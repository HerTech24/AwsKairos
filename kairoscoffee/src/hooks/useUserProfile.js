// src/hooks/useUserProfile.js
import { useState, useEffect } from "react";

export function useUserProfile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        fetch("http://localhost:8080/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                // guardamos para navbar
                localStorage.setItem("userData", JSON.stringify(data));
                setProfile(data);
            })
            .catch(err => console.error("Error cargando perfil local:", err));
    }, []);

    return profile;
}
