import React from "react";
import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";
import "../styles/global.css";
import LogoKairos from "../assets/img/Logo_KairosCoffee.png";

export default function Footer() {
    return (
        <footer className="main-footer py-4 mt-5 bg-custom-dark text-white">
        <div className="container">
            <div className="row">
            {/* --- Columna 1: Logo y métodos de pago --- */}
            <div className="col-12 col-md-3 mb-4 text-center text-md-start">
                <img
                src={LogoKairos}
                alt="Logo Kairós Coffee"
                className="footer-logo mb-3"
                style={{ maxWidth: "150px", backgroundColor: "transparent" }}
                />
                <h5 className="fw-bold">Métodos de Pago:</h5>
                <div className="d-flex justify-content-center justify-content-md-start gap-2 flex-wrap">
                {[
                    {
                    src: "https://cdn.shopify.com/s/files/1/0013/9935/7503/files/logo-flow_480x480.jpg?v=1695649953",
                    alt: "Flowpagos",
                    },
                    {
                    src: "https://cdn.prod.website-files.com/64199d190fc7afa82666d89c/6491bee00befc2b527384a4b_webpay.webp",
                    alt: "Webpay",
                    },
                    {
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvd2_tKsiq60CoFcnhi-RP7aWMN-dTWQDsA&s",
                    alt: "Transbank",
                    },
                    {
                    src: "https://http2.mlstatic.com/D_NQ_NP_747557-MLA74838869274_032024-O.webp",
                    alt: "Mercado Pago",
                    },
                ].map((pago, i) => (
                    <img
                    key={i}
                    src={pago.src}
                    alt={pago.alt}
                    className="img-fluid"
                    style={{ width: "50px" }}
                    />
                ))}
                </div>
            </div>

            {/* --- Columna 2: Navegación Kairós Coffee --- */}
            <div className="col-6 col-md-2 mb-4 text-center text-md-start">
                <h5 className="fw-bold">Kairós Coffee</h5>
                <ul className="list-unstyled">
                <li>
                    <button
                    type="button"
                    className="btn btn-link text-white p-0"
                    onClick={() => console.info("Función pendiente")}
                    >
                    Nuestra Historia
                    </button>
                </li>
                <li>
                    <Link to="/productos" className="text-white text-decoration-none">
                    Productos
                    </Link>
                </li>
                <li>
                    <Link to="/contacto" className="text-white text-decoration-none">
                    Contacto
                    </Link>
                </li>
                <li>
                    <button
                    type="button"
                    className="btn btn-link text-white p-0"
                    onClick={() => console.info("Función pendiente")}
                    >
                    Kairós Coffee Chile
                    </button>
                </li>
                </ul>
            </div>

            {/* --- Columna 3: Información --- */}
            <div className="col-6 col-md-2 mb-4 text-center text-md-start">
                <h5 className="fw-bold">Información</h5>
                <ul className="list-unstyled">
                {[
                    "Preguntas Frecuentes",
                    "Despachos y Retiros",
                    "Cambios y Devoluciones",
                    "Términos y Condiciones",
                ].map((item, i) => (
                    <li key={i}>
                    <button
                        type="button"
                        className="btn btn-link text-white p-0"
                        onClick={() => console.info(`Función pendiente: ${item}`)}
                    >
                        {item}
                    </button>
                    </li>
                ))}
                </ul>
            </div>

            {/* --- Columna 4: Newsletter y contacto --- */}
            <div className="col-12 col-md-5 text-center text-md-start">
                <h5 className="fw-bold">Newsletter</h5>
                <p>
                Suscríbete a nuestro newsletter y entérate de todas nuestras ofertas y novedades.
                </p>
                <Newsletter />

                <h5 className="fw-bold mt-4">Contáctanos</h5>
                <p>
                Si tienes alguna pregunta escríbenos a{" "}
                <a href="mailto:ventas@kairoscoffee.cl" className="text-white">
                    ventas@kairoscoffee.cl
                </a>{" "}
                o a nuestro WhatsApp{" "}
                <a
                    href="https://wa.me/56999345711"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                >
                    +56 9 9934 5711
                </a>
                . ¡Nos pondremos en contacto contigo lo antes posible!
                </p>

                <div className="social-links d-flex justify-content-center justify-content-md-start gap-3">
                <a
                    href="https://www.facebook.com"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                    alt="Facebook"
                    style={{ width: "30px" }}
                    />
                </a>
                <a
                    href="https://www.instagram.com"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                    alt="Instagram"
                    style={{ width: "30px" }}
                    />
                </a>
                </div>
            </div>
            </div>
        </div>

        {/* --- Línea inferior --- */}
        <div className="footer-bottom text-center pt-3 mt-3 border-top border-secondary">
            <p>&copy; 2025 Kairós Coffee. Todos los derechos reservados.</p>
        </div>
        </footer>
    );
}
