// src/components/LogoutButton.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
        className="btn-logout"
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
        Cerrar sesión
        </button>
    );
};

export default LogoutButton;
