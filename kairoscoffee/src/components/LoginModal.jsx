import React, { useEffect, useRef } from 'react';
import LoginButton from './LoginButton'; // ✅ correcto
import LogoKairos from '../assets/img/Logo_KairosCoffee.png'; // Importa el logo

const LoginModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) modalRef.current?.showModal();
        else modalRef.current?.close();
    }, [isOpen]);

    return (
        <dialog ref={modalRef} className="modal-login" onCancel={onClose}>
            <div className="modal-login-minimalista">
                <button className="close-btn" aria-label="Cerrar modal" onClick={onClose}>&times;</button>
                {/* Logo arriba centrado */}
                <img 
                    src={LogoKairos} 
                    alt="Logo Kairós Coffee" 
                    style={{ maxWidth: '180px', marginBottom: '18px', alignSelf: 'center' }}
                />
                <h2>Bienvenido a Kairós Coffee</h2>
                <LoginButton className="btn-auth0" />
                <div className="text-login-desc">
                    ¿No tienes cuenta?
                    <a href="/registro" className="link-registro-black">Regístrate aquí</a>
                </div>
            </div>
        </dialog>
    );
};

export default LoginModal;
