import React from "react";

export default function BannerGif() {
    return (
        <section className="banner-gif" aria-label="Cita inspiracional de café">
        <img
            src="https://org.coloradomesa.edu/~cagardner2/images/ProjectCafeGif2.gif"
            alt="Banner Animado de Café"
        />
        <div className="banner-gif-text">
            <p>"Una taza de té es una excusa para la introspección."</p>
            <p>- Lin Yutang</p>
        </div>
        </section>
    );
}
