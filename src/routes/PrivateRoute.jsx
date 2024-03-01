import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-[calc(100dvh-64px)]">
        <span className="flex items-center gap-2">
          <AiOutlineLoading3Quarters className="size-5 animate-spin" />
          Loading...
        </span>
      </section>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/signin" replace></Navigate>;
};

export default PrivateRoute;
