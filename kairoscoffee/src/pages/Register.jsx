import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/registro.css";
import { useAuth0 } from "@auth0/auth0-react";
import LogoKairos from "../assets/img/Logo_KairosCoffee.png";

const Register = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail]     = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null);

    const navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert(null);

        try {
            const res = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, email, password }),
            });

            if (!res.ok) throw new Error("Error en el registro");

            setAlert({ type: "success", message: "Registro exitoso. Redirigiendo..." });

            setTimeout(() => navigate("/login"), 1200);
        } catch {
            setAlert({ type: "danger", message: "No se pudo registrar. Intenta nuevamente." });
        }
    };

    return (
        <main className="registro-bg">
            <div className="registro-card">

                {/* LOGO */}
                <img 
                    src={LogoKairos}
                    alt="Logo Kairos Coffee"
                    className="auth0-logo"
                />

                {/* TÍTULOS */}
                <h2 className="registro-title">Crear Cuenta</h2>
                <p className="registro-subtitle">
                    "Sabores que llegan en el momento justo"
                </p>

                {/* ALERTA */}
                {alert && (
                    <div className={`registro-alert ${alert.type}`}>
                        {alert.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="registro-form">
                    <label className="registro-label">Nombre</label>
                    <input
                        type="text"
                        className="registro-input"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <label className="registro-label">Email</label>
                    <input
                        type="email"
                        className="registro-input"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="registro-label">Contraseña</label>
                    <input
                        type="password"
                        className="registro-input"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="registro-btn-primary" type="submit">
                        Crear Cuenta
                    </button>
                </form>

                {/* DIVISOR */}
                <div className="registro-divider">
                    <span>o</span>
                </div>

                {/* GOOGLE LOGIN */}
                <button
                    className="registro-btn-google"
                    onClick={() =>
                        loginWithRedirect({ connection: "google-oauth2" })
                    }
                >
                    <img 
                        src="https://tse4.mm.bing.net/th/id/OIP.qtXzOmjqkgkp0yLndNO0CQHaHa?pid=Api&P=0&h=180" 
                        alt="Google" 
                        className="google-icon" 
                    />
                    Registrarse con Google
                </button>
            </div>
        </main>
    );
};

export default Register;
