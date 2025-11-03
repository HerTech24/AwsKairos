// src/components/Newsletter.jsx
import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'danger' // 'danger' o 'success'
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const emailValue = email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '' || !emailRegex.test(emailValue)) {
        setAlert({
            show: true,
            message: 'Por favor, ingresa un correo electrónico válido.',
            type: 'danger'
        });
        return;
        }

        // Correo válido
        setAlert({
        show: true,
        message: '¡Suscripción exitosa! Recibirás nuestras novedades pronto.',
        type: 'success'
        });

        setEmail('');

        setTimeout(() => {
        setAlert({ show: false, message: '', type: '' });
        }, 3000);
    };

    return (
        <>
        <form className="newsletter-form d-flex" onSubmit={handleSubmit} noValidate>
            <input
            type="email"
            className="form-control me-2"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">→</button>
        </form>

        {alert.show && (
            <div className={`alert alert-${alert.type} mt-2`} role="alert">
            {alert.message}
            </div>
        )}
        </>
    );
};

export default Newsletter;
