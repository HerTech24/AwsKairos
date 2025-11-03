import React from "react";
import { useLocation } from "react-router-dom";
import Slider from "../components/Slider";
import CarritoPanel from "../components/CarritoPanel";
import { productos } from "../data/productos";
import { useCarrito } from "../context/CarritoContext";
import "../styles/productos.css";

export default function ProductosPage() {
  const {
    carrito,
    agregarProducto,
    eliminarProducto,
    isCartOpen,
    toggleCart,
  } = useCarrito();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoria = params.get("categoria");

  const secciones = [
    { categoria: "cafe", titulo: "Café Daroma", items: productos.cafeDaroma },
    { categoria: "cafe", titulo: "Café Marleys Coffee", items: productos.cafeMarley },
    { categoria: "cafe", titulo: "Café Illy Coffee", items: productos.cafeIlly },
    { categoria: "cafe", titulo: "Café Lavazza", items: productos.cafeLavazza },
    { categoria: "capsulas", titulo: "Cápsulas Marleys Coffee", items: productos.capsulasMarley },
    { categoria: "capsulas", titulo: "Cápsulas Illy Coffee", items: productos.capsulasIlly },
    { categoria: "capsulas", titulo: "Cápsulas Café con Sentido", items: productos.capsulasCafeConSentido },
    { categoria: "yerba", titulo: "Té Selección", items: productos.te },
    { categoria: "yerba", titulo: "Yerba Mate Selección", items: productos.mate },
    { categoria: "accesorios", titulo: "Accesorios Selección", items: productos.accesorios },
  ];

  const seccionesFiltradas = categoria
    ? secciones.filter((s) => s.categoria === categoria)
    : secciones;

  return (
    <>
      <div className="productos-page">
        <h1 className="text-kairos-primary text-center my-4">
          {categoria ? `Productos: ${categoria.toUpperCase()}` : "SELECCIÓN DE PRODUCTOS"}
        </h1>

        {seccionesFiltradas.map(({ titulo, items }) => (
          <section className="seccion-productos" key={titulo}>
            <h2>{titulo}</h2>
            <Slider items={items} agregarAlCarrito={agregarProducto} />
          </section>
        ))}
      </div>

      <CarritoPanel
        carrito={carrito}
        isOpen={isCartOpen}
        onClose={toggleCart}
        eliminarDelCarrito={eliminarProducto}
      />
    </>
  );
}
