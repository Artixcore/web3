import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-[calc(100dvh-64px)]">
        Loading...
      </section>
    );
  }

  if (!user) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/" replace></Navigate>;
};

export default ProtectedRoute;
