import React, { useState } from "react";
import "../styles/contacto.css";
import LogoKairos from "../assets/img/Logo_KairosCoffee.png";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }));
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  const validarTelefono = (tel) =>
    /^\+56 9\s\d{8}$/.test(tel) || /^\+56 9\s\d{4}\s\d{4}$/.test(tel);

  const validarFormulario = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!validarEmail(formData.email)) {
      newErrors.email = "Por favor, ingresa un correo válido.";
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!validarTelefono(formData.telefono)) {
      newErrors.telefono = "Formato inválido (Ej: +56 9 1234 5678)";
    }
    if (!formData.tipo) newErrors.tipo = "Selecciona una opción.";
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es obligatorio.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setSuccess(true);
      setFormData({ nombre: "", email: "", telefono: "", tipo: "", mensaje: "" });
      setTimeout(() => setSuccess(false), 3000);
      console.log("Formulario enviado:", formData);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-section pt-4 pb-5">
        <div className="container">
          <div className="text-center mb-4">
            <img
              src={LogoKairos}
              alt="Logo Kairos Coffee"
              className="logo-kairos mb-3"
            />
            <h2 className="fw-bold text-kairos-primary">Contáctanos</h2>
            <p className="text-muted">
              ¿Buscas café, té o quieres cotizar para tu negocio? ¡Escríbenos!
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card contacto-card p-4">
                <form className="row g-4" onSubmit={handleSubmit} noValidate>
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      type="text"
                      id="nombre"
                      className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tucorreo@ejemplo.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input
                      type="tel"
                      id="telefono"
                      className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+56 9 1234 5678"
                    />
                    {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="tipo" className="form-label">Interés Principal</label>
                    <select
                      id="tipo"
                      className={`form-select ${errors.tipo ? "is-invalid" : ""}`}
                      value={formData.tipo}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona...</option>
                      <option value="cafe">Café en grano/molido</option>
                      <option value="capsulas">Cápsulas</option>
                      <option value="teymate">Té / Yerba Mate</option>
                      <option value="accesorios">Accesorios</option>
                      <option value="mayorista">Venta Mayorista</option>
                    </select>
                    {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
                  </div>

                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea
                      id="mensaje"
                      rows="4"
                      className={`form-control ${errors.mensaje ? "is-invalid" : ""}`}
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos lo que necesitas..."
                    />
                    {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
                  </div>

                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-kairos-primary px-5">
                      Enviar Mensaje
                    </button>
                  </div>
                </form>

                {success && (
                  <div className="alert alert-success mt-4 text-center" role="alert">
                    ¡Mensaje enviado con éxito!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
