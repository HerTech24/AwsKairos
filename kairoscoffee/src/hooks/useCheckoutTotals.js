import { useMemo } from "react";

const useCheckoutTotals = (carrito, descuento, IVA_RATE = 0.19) => {
  const subtotal = useMemo(() =>
    carrito.reduce((acc, item) => acc + item.precio * item.quantity, 0),
  [carrito]);

  const subtotalConDescuento = useMemo(() => subtotal - subtotal * descuento, [subtotal, descuento]);
  const iva = useMemo(() => subtotalConDescuento * IVA_RATE, [subtotalConDescuento]);
  const total = useMemo(() => subtotalConDescuento + iva, [subtotalConDescuento, iva]);

  return { subtotal, iva, total };
};

export default useCheckoutTotals;
