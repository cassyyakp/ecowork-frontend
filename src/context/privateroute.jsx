import { Navigate } from "react-router-dom";
import { useAuth } from "./authcontext";

export default function PrivateRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/AuthPage" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/accueil" replace />;
  }

  return children;
}
