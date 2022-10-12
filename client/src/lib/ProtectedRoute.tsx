import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationContext from "./AuthenticationContext";
import { AuthContextType } from "./types";

// Protected route: authenticated user required

const ProtectedRoute = ({ children }: {children: JSX.Element[] | JSX.Element}) => {

  const { auth } = useContext(AuthenticationContext) as AuthContextType;

  if (!auth.accessToken) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
