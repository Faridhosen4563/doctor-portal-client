import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import useAdmin from "../../hooks/useAdmin/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, adminLoading] = useAdmin(user?.email);
  const location = useLocation();
  if (loading || adminLoading) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">...</span>
        </div>
      </div>
    );
  }
  if (user?.email && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
