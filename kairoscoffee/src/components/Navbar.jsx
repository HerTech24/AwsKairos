import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom"; 
import { useCarrito } from "../context/CarritoContext";
import "../styles/navbar.css";

const Navbar = ({ 
  onProfileClick = () => window.location.reload(),
  auth0Hook = null,
  carritoHook = null,
  navigateHook = null
}) => {

  const auth0Real = useAuth0();
  const carritoReal = useCarrito();
  const navigateReal = useNavigate();

  const { isAuthenticated, user, logout, loginWithRedirect } = auth0Hook || auth0Real;
  const { carrito, toggleCart } = carritoHook || carritoReal;
  const navigate = navigateHook || navigateReal;

  const [menuOpen, setMenuOpen] = useState(false);

  // === LOGIN LOCAL ===
  const backendAccessToken = localStorage.getItem("accessToken");
  const localUser = JSON.parse(localStorage.getItem("userData"));

  const handleLogin = async () => {
    await loginWithRedirect({
      connection: "google-oauth2",
    });
  };

  const irACategoria = (categoria) => {
    navigate(`/productos?categoria=${categoria}`);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${menuOpen ? "active" : ""}`}>
      <div className="navbar-logo">
        <span className="navbar-brand" onClick={() => navigate("/")}>
          Kairos Coffee
        </span>
      </div>

      <div className="navbar-links">
        <span onClick={() => navigate("/")}>INICIO</span>
        <span onClick={() => irACategoria("cafe")}>CAFÉ</span>
        <span onClick={() => irACategoria("capsulas")}>CÁPSULAS</span>
        <span onClick={() => irACategoria("accesorios")}>ACCESORIOS</span>
        <span onClick={() => irACategoria("yerba")}>YERBA MATE</span>
        <span onClick={() => navigate("/contacto")}>CONTÁCTANOS</span>
      </div>

      <div className="navbar-actions">
        {isAuthenticated || backendAccessToken ? (
          <>
            <span className="navbar-user">
              👋 Hola, {user?.name || localUser?.nombre || "Usuario"}
            </span>

            <Link to="/perfil" className="btn-perfil">
                Mi Perfil
            </Link>


            <button
              className="btn-logout"
              onClick={() => {
                // LOGOUT LOCAL
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("userData");

                // LOGOUT SOCIAL
                if (isAuthenticated) {
                  logout({ returnTo: window.location.origin });
                } else {
                  window.location.reload();
                }
              }}
            >
              CERRAR SESIÓN
            </button>
          </>
        ) : (
          <>
            <button className="btn-registro-navbar" onClick={() => navigate("/registro")}>
              REGISTRARSE
            </button>

            <button className="btn-login-navbar" onClick={() => navigate("/login")}>
              INICIAR SESIÓN
            </button>
          </>
        )}

        <button 
          className="btn-cart" 
          onClick={toggleCart}
          aria-label="Abrir carrito"
          data-testid="cart-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 
              2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 
              0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2
              -2-2zM7.16 14.26l.03.01h9.62c.75
              0 1.41-.41 1.75-1.03l3.58-6.49a.75.75 
              0 0 0-.65-1.12H6.31l-.94-2H1v2h3.1l3.6 
              7.59-.84 1.52C6.17 14.05 6.61 14.26 7.16 
              14.26z"/>
          </svg>
          <span className="cart-count">{carrito?.length || 0}</span>
        </button>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
