// src/auth/AuthProvider.jsx
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-zjxrrfutupruimyb.us.auth0.com";
const clientId = "sAGxMf8Tco0tNtPpvhaarafeiBvigsJv";

export const AuthProvider = ({ children }) => {
  const onRedirectCallback = (appState) => {
    window.history.replaceState({}, document.title, appState?.returnTo || "/");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};
