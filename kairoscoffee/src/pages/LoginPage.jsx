// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/login-auth0.css";
import LogoKairos from "../assets/img/Logo_KairosCoffee.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  // ==========================
  //     LOGIN LOCAL
  // ==========================
  const handleLocalLogin = async (e) => {
    e.preventDefault();
    setAlert(null);

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");

      const data = await res.json();

      console.log("🔍 Respuesta del backend:", data);

      // Guardar tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Guardar usuario local con la estructura correcta
      // El backend puede devolver data.user o data.usuario
      const usuarioData = data.user || data.usuario;
      
      if (usuarioData) {
        // Asegurar que guardamos nombre y apellido correctamente
        const userToSave = {
          id: usuarioData.id || usuarioData.idUsuario,
          nombre: usuarioData.nombre,
          apellido: usuarioData.apellido,
          email: usuarioData.email,
          telefono: usuarioData.telefono
        };
        
        localStorage.setItem("userData", JSON.stringify(userToSave));
        console.log("✅ Usuario guardado:", userToSave);
      } else {
        console.warn("⚠️ No se encontró información del usuario en la respuesta");
      }

      setAlert({ type: "success", message: "Inicio de sesión exitoso" });

      setTimeout(() => navigate("/"), 700);

    } catch (err) {
      setAlert({ type: "danger", message: "Email o contraseña incorrectos." });
    }
  };

  return (
    <div className="auth0-bg">
      <div className="auth0-card">

        <img src={LogoKairos} alt="Logo Kairos Coffee" className="auth0-logo" />

        <h2 className="auth0-title">Kairos Coffee</h2>
        <p className="auth0-subtitle">"Sabores que llegan en el momento justo"</p>

        {alert && (
          <div className={`auth0-alert ${alert.type}`}>{alert.message}</div>
        )}

        <form onSubmit={handleLocalLogin} className="auth0-form">

          <label className="auth0-label">Correo electrónico *</label>
          <input
            type="email"
            className="auth0-input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="auth0-label">Contraseña *</label>
          <input
            type="password"
            className="auth0-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth0-btn-primary">
            Continuar
          </button>
        </form>

        <p className="auth0-help">¿Has olvidado tu contraseña?</p>

        <p className="auth0-register">
          ¿No tienes una cuenta? <a href="/registro">Regístrate</a>
        </p>

        <div className="auth0-divider">
          <span>o</span>
        </div>

        <button
          className="auth0-btn-google"
          onClick={() => loginWithRedirect({ connection: "google-oauth2" })}
        >
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.qtXzOmjqkgkp0yLndNO0CQHaHa?pid=Api&P=0&h=180"
            alt="Google"
            className="google-icon"
          />
          Continuar con Google
        </button>

      </div>
    </div>
  );
};

export default LoginPage;