// src/components/profile/ProfileHeader.jsx
import React from "react";

const ProfileHeader = ({ nombre, avatar }) => {
  return (
    <div className="perfil-header">
      <img 
        src={avatar || "https://i.pravatar.cc/200"} 
        alt="avatar" 
        className="perfil-avatar" 
      />

      <h1>{nombre}</h1>
      <p className="perfil-sub">Bienvenido a tu perfil en Kairos Coffee ☕</p>

      <button className="btn-editar">Editar Perfil</button>
    </div>
  );
};

export default ProfileHeader;
