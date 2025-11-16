// src/auth/AuthProvider.jsx
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProvider = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI;

  const onRedirectCallback = (appState) => {
    window.history.replaceState({}, document.title, appState?.returnTo || "/");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};
