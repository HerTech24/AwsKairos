import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
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

  const { isAuthenticated, user, logout, loginWithRedirect } =
    auth0Hook || auth0Real;

  const { carrito, toggleCart } = carritoHook || carritoReal;
  const navigate = navigateHook || navigateReal;

  const [menuOpen, setMenuOpen] = useState(false);

  // === LOGIN LOCAL ===
  const backendAccessToken = localStorage.getItem("accessToken");
  const localUser = JSON.parse(localStorage.getItem("userData"));

  const irACategoria = (categoria) => {
    navigate(`/productos?categoria=${categoria}`);
    setMenuOpen(false);
  };

  return (
    <nav className={`nav-modern ${menuOpen ? "open" : ""}`}>

      {/* LOGO */}
      <div className="nav-logo" onClick={() => navigate("/")}>
        Kairos Coffee
      </div>

      {/* LINKS */}
      <div className="nav-links">
        <span onClick={() => navigate("/")}>Inicio</span>
        <span onClick={() => irACategoria("cafe")}>Café</span>
        <span onClick={() => irACategoria("capsulas")}>Cápsulas</span>
        <span onClick={() => irACategoria("accesorios")}>Accesorios</span>
        <span onClick={() => irACategoria("yerba")}>Yerba Mate</span>
        <span onClick={() => navigate("/contacto")}>Contáctanos</span>
      </div>

      {/* ACCIONES (LOGIN / PERFIL / CARRITO) */}
      <div className="nav-actions">

        {/* SI ESTÁ LOGUEADO */}
        {(isAuthenticated || backendAccessToken) ? (
          <>
            <span className="nav-user">
              👋 {user?.name || localUser?.nombre || "Usuario"}
            </span>

            <Link to="/perfil" className="nav-btn-outline">
              Mi Perfil
            </Link>

            <button
              className="nav-btn-outline"
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("userData");

                if (isAuthenticated) {
                  logout({ returnTo: window.location.origin });
                } else {
                  window.location.reload();
                }
              }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            {/* SOLO ESTOS TRES BOTONES */}
            <button
              className="nav-btn-outline"
              onClick={() => navigate("/productos")}
            >
              Ver Productos
            </button>

            <button
              className="nav-btn-outline"
              onClick={() => navigate("/registro")}
            >
              Registrarse
            </button>

            <button
              className="nav-btn-filled"
              onClick={() => navigate("/login")}
            >
              Iniciar Sesión
            </button>
          </>
        )}

        {/* CARRITO */}
        <button className="nav-cart" onClick={toggleCart}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
            fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 
              2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 
              0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2
              -2-2zM7.16 14.26l.03.01h9.62c.75
              0 1.41-.41 1.75-1.03l3.58-6.49a.75.75 
              0 0 0-.65-1.12H6.31l-.94-2H1v2h3.1l3.6 
              7.59-.84 1.52C6.17 14.05 6.61 14.26 7.16 
              14.26z"/>
          </svg>

          <span className="cart-badge">{carrito?.length || 0}</span>
        </button>

        {/* HAMBURGUESA */}
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* MENU MOBILE */}
      <div className="nav-mobile">
        <span onClick={() => navigate("/")}>Inicio</span>
        <span onClick={() => irACategoria("cafe")}>Café</span>
        <span onClick={() => irACategoria("capsulas")}>Cápsulas</span>
        <span onClick={() => irACategoria("accesorios")}>Accesorios</span>
        <span onClick={() => irACategoria("yerba")}>Yerba Mate</span>
        <span onClick={() => navigate("/contacto")}>Contáctanos</span>
      </div>

    </nav>
  );
};

export default Navbar;
