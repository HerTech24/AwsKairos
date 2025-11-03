// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/registro.css';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAlert({ show: false, type: '', message: '' });

        const { nombre, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setAlert({ show: true, type: 'alert-danger', message: 'Las contraseñas no coinciden.' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setAlert({ show: true, type: 'alert-danger', message: 'Correo inválido.' });
            return;
        }

        console.log('Usuario Registrado:', nombre, email);

        setAlert({
            show: true,
            type: 'alert-success',
            message: `¡Registro exitoso! Bienvenido(a) ${nombre}. Redirigiendo...`
        });

        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <main className="registro-container flex-grow-1">
            <div className="card registro-card p-4 p-md-5">
                <h2 className="card-title text-center mb-4 fw-bold text-kairos-primary">
                    Crear Cuenta Kairós Coffee
                </h2>
                <form id="registroForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            minLength="6"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                    </div>

                    {alert.show && (
                        <div className={`alert ${alert.type}`} role="alert">
                            {alert.message}
                        </div>
                    )}

                    <button type="submit" className="btn btn-kairos-primary w-100 fw-bold">
                        REGISTRARSE
                    </button>

                    <hr />

                    <p className="text-center mt-3">
                        ¿Ya tienes cuenta? <a href="/" className="text-kairos-primary">Inicia Sesión</a>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default Register;
