import React, { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import useCheckoutTotals from "../hooks/useCheckoutTotals";
import OrderSummary from "../components/Checkout/ResumenPedido";
import ShippingPaymentForm from "../components/Checkout/shippingPaymentForm";
import "../styles/checkout.css";

const CheckoutPage = () => {
  const { carrito } = useCarrito();
  const [descuento, setDescuento] = useState(0);
  const { subtotal, iva, total } = useCheckoutTotals(carrito, descuento);

  return (
    <div className="checkout-page">
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-5">
            <div className="checkout-card">
              <h2 className="checkout-title">Resumen del Pedido</h2>
              <OrderSummary
                carrito={carrito}
                subtotal={subtotal}
                iva={iva}
                total={total}
                descuento={descuento}
                setDescuento={setDescuento}
              />
            </div>
          </div>

          <div className="col-lg-5">
            <div className="checkout-card">
              <h2 className="checkout-title">Datos de Envío</h2>
              <ShippingPaymentForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
