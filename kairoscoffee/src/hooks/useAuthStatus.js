// src/auth/useAuthStatus.js
import { useAuth0 } from "@auth0/auth0-react";

const useAuthStatus = () => {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout,
    error
  } = useAuth0();

  return {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout,
    error
  };
};

export default useAuthStatus;
