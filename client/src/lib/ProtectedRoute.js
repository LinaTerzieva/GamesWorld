import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationContext from "./AuthenticationContext";

// Protected route: authenticated user required

const ProtectedRoute = ({ children }) => {

  const { auth } = useContext(AuthenticationContext);

  if (!auth.accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
