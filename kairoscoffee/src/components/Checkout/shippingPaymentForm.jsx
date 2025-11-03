import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingPaymentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    metodoPago: "tarjeta",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre completo</label>
        <input name="nombre" className="form-control" required onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input name="direccion" className="form-control" required onChange={handleChange} />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Ciudad</label>
          <input name="ciudad" className="form-control" required onChange={handleChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Código Postal</label>
          <input name="codigoPostal" className="form-control" required onChange={handleChange} />
        </div>
      </div>

      <fieldset className="mb-4">
        <legend className="h5 text-kairos-primary">Método de Pago</legend>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="metodoPago"
            value="tarjeta"
            checked={formData.metodoPago === "tarjeta"}
            onChange={handleChange}
          />
          <label className="form-check-label">Tarjeta</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="metodoPago"
            value="transferencia"
            checked={formData.metodoPago === "transferencia"}
            onChange={handleChange}
          />
          <label className="form-check-label">Transferencia</label>
        </div>
      </fieldset>

      <button type="submit" className="btn btn-kairos-primary w-100">
        Confirmar Compra
      </button>
    </form>
  );
};

export default ShippingPaymentForm;
