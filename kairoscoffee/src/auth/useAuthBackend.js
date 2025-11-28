import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export function useAuthBackend() {
    const { isAuthenticated, getIdTokenClaims } = useAuth0();

    useEffect(() => {
        const syncWithBackend = async () => {
            try {
                if (!isAuthenticated) {
                    console.log("⛔ Usuario NO autenticado en Auth0");
                    return;
                }

                console.log("🔍 Intentando obtener ID Token de Auth0…");
                const claims = await getIdTokenClaims();

                if (!claims || !claims.__raw) {
                    console.error("❌ No se pudo obtener claims desde Auth0.");
                    return;
                }

                const idToken = claims.__raw;

                console.log("✅ ID Token obtenido:", idToken.substring(0, 20) + "...");
                console.log("🌐 Enviando token al backend…");

                const res = await fetch("http://localhost:8080/auth/auth0", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        provider: "AUTH0",
                        idToken: idToken,
                    }),
                });

                if (!res.ok) {
                    console.error("❌ Backend respondió con error:", res.status);
                    return;
                }

                const data = await res.json();

                // Guardar tokens
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                // ✅ NUEVO: Guardar datos del usuario
                if (data.user) {
                    localStorage.setItem("userData", JSON.stringify(data.user));
                    console.log("✅ Datos de usuario guardados:", data.user);
                }

                console.log("🔥 Sesión sincronizada con backend");
                console.log("AccessToken:", data.accessToken);
                console.log("RefreshToken:", data.refreshToken);

            } catch (error) {
                console.error("💥 ERROR en syncWithBackend:", error);
            }
        };

        syncWithBackend();
    }, [isAuthenticated, getIdTokenClaims]);
}