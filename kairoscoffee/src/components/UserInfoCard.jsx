// src/components/profile/UserInfoCard.jsx
import React from "react";

const UserInfoCard = ({ user }) => {
  return (
    <div className="user-card">
      <h2>Datos Personales</h2>
      <div className="user-info">
        <p><strong>Nombres:</strong> {user.nombre}</p>
        <p><strong>Apellidos:</strong> {user.apellido}</p>
        <p><strong>Correo:</strong> {user.correo}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
