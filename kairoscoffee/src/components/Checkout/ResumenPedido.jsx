import React from "react";
import CheckoutItem from "./itemCarrito";
import CouponSection from "./cupon";

const OrderSummary = ({ carrito, subtotal, iva, total, descuento, setDescuento }) => {
  return (
    <>
      <ul className="list-group mb-3">
        {carrito.map((item) => (
          <CheckoutItem key={item.id} item={item} />
        ))}
      </ul>

      <CouponSection setDescuento={setDescuento} />

      <table className="table mt-4">
        <tbody>
          <tr>
            <td>Subtotal:</td>
            <td className="text-end">${subtotal.toLocaleString("es-CL")}</td>
          </tr>
          <tr>
            <td>Descuento ({(descuento * 100).toFixed(0)}%)</td>
            <td className="text-end text-danger">
              -${(subtotal * descuento).toLocaleString("es-CL")}
            </td>
          </tr>
          <tr>
            <td>IVA (19%)</td>
            <td className="text-end">${iva.toLocaleString("es-CL")}</td>
          </tr>
          <tr className="fw-bold fs-5">
            <td>Total:</td>
            <td className="text-end">${total.toLocaleString("es-CL")}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderSummary;
