import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MoviesContext } from "./contexts/moviesContext";

const ProtectedRoutes = () => {
  const context = useContext(MoviesContext);

  return context.isAuthenticated === true ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoutes;
