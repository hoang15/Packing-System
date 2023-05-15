import { Navigate } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";

const PrivateRoutes = ({ children }) => {
  let isAuthenticated = localStorage.getItem(AUTH_TOKEN);
  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
