// src/hooks/useUserIdentity.js
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useUserIdentity = () => {
  const { isAuthenticated, user } = useAuth0();

  const [identity, setIdentity] = useState({
    isLogged: false,
    name: null,
    source: null
  });

  useEffect(() => {
    // 🔥 1) LOGIN LOCAL
    const localUserRaw = localStorage.getItem("userData");

    if (localUserRaw) {
      const localUser = JSON.parse(localUserRaw);

      const localName =
        localUser.nombre ||
        localUser.name ||
        localUser.username ||
        null;

      setIdentity({
        isLogged: true,
        name: localName,
        source: "local"
      });

      return;
    }

    // 🔥 2) LOGIN AUTH0/GOOGLE
    if (isAuthenticated && user) {
      setIdentity({
        isLogged: true,
        name: user.name,
        source: "google"
      });
      return;
    }

    // ❌ 3) SIN LOGIN
    setIdentity({
      isLogged: false,
      name: null,
      source: null
    });

  }, [isAuthenticated, user]);

  return identity;
};
