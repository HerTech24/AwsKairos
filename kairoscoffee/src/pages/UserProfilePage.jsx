// src/pages/UserProfilePage.jsx
import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import UserInfoCard from "../components/UserInfoCard";
import PurchaseHistory from "../components/PurchaseHistory";
import MembershipCard from "../components/MembershipCard";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/userProfile.css";

const UserProfilePage = () => {
  const { user: auth0User, isAuthenticated } = useAuth0();

  const [userData, setUserData] = useState(null);
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("userData"));

    // Si existe usuario local → úsalo
    if (localUser) {
      setUserData(localUser);
    }

    // Si el usuario viene de Auth0
    if (isAuthenticated && auth0User) {
      setUserData({
        nombre: auth0User.given_name || auth0User.name,
        apellido: auth0User.family_name || "",
        correo: auth0User.email,
        telefono: "+56 9 1234 5678", // inventado como pediste
        avatar: auth0User.picture,
      });
    }

    // ===================================================
    // 🔥 SIMULACIÓN DE COMPRAS (REEMPLAZA LA PETICIÓN REAL)
    // ===================================================

    const comprasSimuladas = [
      {
        fecha: "2025-01-15",
        productos: [
          { nombre: "Café Etiopía 500g", cantidad: 1, precio: 8490 },
          { nombre: "Cápsulas Espresso x10", cantidad: 2, precio: 4990 },
        ],
        total: 8490 + 2 * 4990,
      },
      {
        fecha: "2025-02-02",
        productos: [
          { nombre: "Yerba Mate Premium 1kg", cantidad: 1, precio: 6990 },
          { nombre: "Bombilla de acero", cantidad: 1, precio: 2990 },
        ],
        total: 6990 + 2990,
      },
      {
        fecha: "2025-02-20",
        productos: [
          { nombre: "Café Peruano 250g", cantidad: 2, precio: 5490 },
        ],
        total: 2 * 5490,
      },
    ];

    // Simulación de carga (puedes quitar el timeout si quieres)
    setTimeout(() => {
      setCompras(comprasSimuladas);
    }, 400);

  }, [auth0User, isAuthenticated]);

  if (!userData) {
    return <p style={{ marginTop: 40, textAlign: "center" }}>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <ProfileHeader nombre={userData.nombre} avatar={userData.avatar} />
      <MembershipCard />
      <UserInfoCard user={userData} />
      <PurchaseHistory compras={compras} />
    </div>
  );
};

export default UserProfilePage;
