// src/components/LoginButton.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    const handleGoogleLogin = () => {
        loginWithRedirect({ connection: "google-oauth2" });
    };

    return (
        <button className="btn-login" onClick={handleGoogleLogin}>
        Iniciar sesión con Google
        </button>
    );
};

export default LoginButton;
